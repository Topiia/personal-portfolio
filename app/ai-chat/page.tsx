import type { Metadata } from 'next';
import { ChatContainer } from '@/components/ui/chat/ChatContainer';

export const metadata: Metadata = {
    title: 'Talk With AI About Me',
    description: 'Ask questions about projects, skills, and engineering experience — powered by AI.',
};

export default function AIChatPage() {
    return (
        <div className="min-h-dvh flex flex-col bg-background text-textPrimary">
            {/* Header */}
            <header className="border-b border-border/10 backdrop-blur-xl bg-surface/60 sticky top-0 z-10">
                <div className="container mx-auto px-6 max-w-3xl h-16 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-textHeading leading-tight">Talk With AI About Me</h1>
                        <p className="text-xs text-textMuted">Ask about projects, skills, and experience</p>
                    </div>
                </div>
            </header>

            {/* Chat area fills remaining viewport height */}
            <main className="flex-1 flex flex-col container mx-auto px-0 max-w-3xl w-full overflow-hidden">
                <ChatContainer />
            </main>
        </div>
    );
}
