export const runtime = 'edge';

import { runRetrieval } from '@/lib/ai/retrieval';
import { buildModelMessages, FALLBACK_RESPONSE } from '@/lib/ai/prompts';
import type { ChatMessage } from '@/lib/ai/prompts';

// Module-level rate limit tracker (lives for the lifetime of the edge function instance)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 3000;

function generateClientKey(req: Request): string {
    const ua = req.headers.get('user-agent') ?? 'unknown';
    const lang = req.headers.get('accept-language') ?? 'unknown';
    // Simple hash: combine key characters into a numeric fingerprint
    const raw = ua + lang;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
        hash = (hash << 5) - hash + raw.charCodeAt(i);
        hash |= 0;
    }
    return String(hash);
}

export async function POST(req: Request) {
    // 1. Validate request payload
    let body: { messages?: unknown };
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
        return Response.json({ error: 'Invalid request: messages array is required.' }, { status: 400 });
    }

    // Ensure all message items are valid
    const isValid = (messages as unknown[]).every(
        (m): m is ChatMessage =>
            typeof m === 'object' &&
            m !== null &&
            ['user', 'assistant', 'system'].includes((m as { role: string }).role) &&
            typeof (m as { content: string }).content === 'string'
    );
    if (!isValid) {
        return Response.json({ error: 'Invalid message format.' }, { status: 400 });
    }

    const typedMessages = messages as ChatMessage[];

    // 2. Rate limiting – fingerprint-based
    const clientKey = generateClientKey(req);
    const now = Date.now();
    const lastRequest = rateLimitMap.get(clientKey);
    if (lastRequest && (now - lastRequest) < RATE_LIMIT_MS) {
        return Response.json({ error: 'Rate limit exceeded. Please wait a moment.' }, { status: 429 });
    }
    rateLimitMap.set(clientKey, now);

    // 3. Get the last user message for retrieval
    const lastUserMsg = [...typedMessages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) {
        return Response.json({ error: 'No user message found.' }, { status: 400 });
    }

    // 4. Run retrieval pipeline (tokenize + score + formt context)
    const { context, shouldFallback } = runRetrieval(lastUserMsg.content);

    // 5. Relevance fallback – short-circuit before calling Groq
    if (shouldFallback) {
        return new Response(FALLBACK_RESPONSE, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    // 6. Build prompt with history and context
    const modelMessages = buildModelMessages(context, typedMessages);

    // 7. Call Groq API with streaming via direct fetch
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
        return Response.json({ error: 'AI service is not configured.' }, { status: 500 });
    }

    let groqResponse: Response;
    try {
        groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: modelMessages,
                stream: true,
                temperature: 0.5,
                max_tokens: 1024,
            }),
        });
    } catch {
        return Response.json({ error: 'Failed to connect to AI service.' }, { status: 500 });
    }

    if (!groqResponse.ok) {
        return Response.json({ error: 'AI service returned an error.' }, { status: 500 });
    }

    // 8. Stream SSE response back to client via a buffer-safe TransformStream
    let buffer = '';
    const parser = new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, controller) {
            buffer += new TextDecoder().decode(chunk, { stream: true });
            const lines = buffer.split('\n');
            // Preserve the last (possibly incomplete) line for the next chunk
            buffer = lines.pop() ?? '';

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed === 'data: [DONE]') return;
                if (!trimmed.startsWith('data: ')) continue;
                try {
                    const json = JSON.parse(trimmed.slice(6));
                    const token: string | undefined = json?.choices?.[0]?.delta?.content;
                    if (token) {
                        controller.enqueue(new TextEncoder().encode(token));
                    }
                } catch {
                    // Ignore partial or malformed JSON chunks
                }
            }
        },
        flush(controller) {
            // Process remaining buffer content when stream closes
            if (buffer.trim().startsWith('data: ')) {
                try {
                    const json = JSON.parse(buffer.trim().slice(6));
                    const token: string | undefined = json?.choices?.[0]?.delta?.content;
                    if (token) controller.enqueue(new TextEncoder().encode(token));
                } catch { /* ignore */ }
            }
        },
    });

    return new Response(groqResponse.body!.pipeThrough(parser), {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
