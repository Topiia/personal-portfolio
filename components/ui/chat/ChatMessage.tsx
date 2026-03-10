'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '@/lib/ai/prompts';

interface ChatMessageProps {
    message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/80 to-primary/80 flex items-center justify-center text-xs font-bold text-white">
                        AI
                    </div>
                </div>
            )}
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                        ? 'bg-accent text-white rounded-tr-sm'
                        : 'bg-surface border border-border/20 text-textPrimary rounded-tl-sm'
                }`}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                    <ReactMarkdown
                        skipHtml
                        components={{
                            a: ({ ...props }) => (
                                <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent underline hover:opacity-80 transition-opacity"
                                />
                            ),
                            p: ({ ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                            ul: ({ ...props }) => <ul {...props} className="list-disc list-inside mb-2 space-y-1" />,
                            ol: ({ ...props }) => <ol {...props} className="list-decimal list-inside mb-2 space-y-1" />,
                            code: ({ ...props }) => (
                                <code {...props} className="bg-black/20 px-1 py-0.5 rounded text-xs font-mono" />
                            ),
                            pre: ({ ...props }) => (
                                <pre {...props} className="bg-black/30 p-3 rounded-lg overflow-x-auto mb-2 text-xs font-mono" />
                            ),
                            strong: ({ ...props }) => <strong {...props} className="font-semibold text-textHeading" />,
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                )}
            </div>
            {isUser && (
                <div className="flex-shrink-0 ml-3 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 flex items-center justify-center text-xs font-bold text-white">
                        You
                    </div>
                </div>
            )}
        </div>
    );
}
