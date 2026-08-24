import type { Metadata } from 'next';
import Link from 'next/link';
import { ChatContainer } from '@/components/ui/chat/ChatContainer';

export const metadata: Metadata = {
    title: 'Ask About The Work | Ankit Singh',
    description: 'Ask questions about projects, engineering decisions, and technical experience — powered by AI.',
};

export default function AIChatPage() {
    return (
        <div className="min-h-dvh flex flex-col bg-ink text-paper">
            {/* Editorial header */}
            <header className="sticky top-0 z-10 bg-ink/95 backdrop-blur-sm border-b border-[rgba(243,240,232,0.08)]">
                <div className="editorial-container h-[72px] flex items-center justify-between">
                    {/* Left: back link */}
                    <Link
                        href="/"
                        className="text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-[rgba(243,240,232,0.38)] hover:text-paper transition-colors duration-200"
                    >
                        ← ANKIT SINGH
                    </Link>

                    {/* Center: title */}
                    <div className="text-center">
                        <h1 className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-paper">
                            ASK ABOUT THE WORK
                        </h1>
                        <p className="text-[0.625rem] text-[rgba(243,240,232,0.35)] tracking-wide mt-0.5">
                            AI layer — powered by Groq
                        </p>
                    </div>

                    {/* Right: status */}
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-acid" aria-hidden="true" />
                        <span className="text-[0.625rem] font-semibold tracking-[0.10em] uppercase text-[rgba(243,240,232,0.40)]">
                            Online
                        </span>
                    </div>
                </div>
            </header>

            {/* Chat container fills remaining height */}
            <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto overflow-hidden px-4 md:px-0">
                <ChatContainer />
            </main>
        </div>
    );
}
