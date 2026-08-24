'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useChatSession } from '@/lib/hooks/useChatSession';
import { ChatMessage } from '@/lib/ai/prompts';
import { ChatMessageBubble } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';

export function ChatContainer() {
    const { messages, addMessage, updateLastMessage } = useChatSession();
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Auto-scroll on new messages or streaming updates
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = useCallback(async (text: string) => {
        // Abort any active stream
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const userMessage: ChatMessage = { role: 'user', content: text };
        addMessage(userMessage);

        // Append empty assistant message – will be filled as stream arrives
        const emptyAssistant: ChatMessage = { role: 'assistant', content: '' };
        addMessage(emptyAssistant);

        setIsStreaming(true);
        setError(null);

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({ error: 'Unknown error' }));
                const errorMsg = response.status === 429
                    ? "You're sending messages too fast. Please wait a moment."
                    : errData.error ?? "Sorry, I encountered an error. Please try again.";
                updateLastMessage(errorMsg);
                setIsStreaming(false);
                return;
            }

            if (!response.body) {
                updateLastMessage("Sorry, I received an empty response. Please try again.");
                setIsStreaming(false);
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = '';

            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                accumulated += chunk;
                updateLastMessage(accumulated);
            }
        } catch (err) {
            if ((err as Error).name === 'AbortError') {
                // User aborted – do not show an error
            } else {
                updateLastMessage("Sorry, something went wrong. Please try again.");
            }
        } finally {
            setIsStreaming(false);
        }
    }, [messages, addMessage, updateLastMessage]);

    // Show typing indicator only while isStreaming AND the last assistant message is still empty
    const showTypingIndicator = isStreaming && messages.length > 0 && messages[messages.length - 1]?.content === '';

    return (
        <div className="flex flex-col h-full">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-[clamp(1rem,3dvh,2rem)] space-y-1">
                {messages.length === 0 && (
                    <div className="pt-[clamp(1.5rem,4dvh,3rem)] text-center">
                        <p className="text-[rgba(243,240,232,0.28)] text-[0.8125rem]">
                            No messages yet — ask anything about the work.
                        </p>
                    </div>
                )}

                {messages.map((msg, i) => {
                    // Skip empty assistant messages (show TypingIndicator instead)
                    if (msg.role === 'assistant' && msg.content === '' && isStreaming) return null;
                    return <ChatMessageBubble key={i} message={msg} />;
                })}

                {showTypingIndicator && <TypingIndicator />}

                {error && (
                    <div className="text-coral text-sm text-center py-2">{error}</div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-4 md:px-8 pb-[clamp(1rem,3dvh,1.5rem)] pt-[clamp(0.5rem,1.5dvh,0.75rem)] border-t border-[rgba(243,240,232,0.08)]">
                <ChatInput onSend={handleSend} disabled={isStreaming} />
                <p className="text-center text-[0.625rem] text-[rgba(243,240,232,0.24)] mt-3 tracking-wide">
                    Ask about projects, engineering decisions, or architecture.
                </p>
            </div>
        </div>
    );
}
