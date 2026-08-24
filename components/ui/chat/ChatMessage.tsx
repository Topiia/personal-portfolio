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
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {/* Role label — editorial, not an avatar bubble */}
            {!isUser && (
                <div className="flex-shrink-0 mr-4 mt-0.5 pt-1">
                    <span className="text-[0.5625rem] font-bold tracking-[0.14em] uppercase text-acid">AI</span>
                </div>
            )}

            <div
                className={`max-w-[82%] text-[0.9375rem] leading-relaxed ${
                    isUser
                        ? 'text-[rgba(243,240,232,0.70)] text-right'
                        : 'text-[rgba(243,240,232,0.82)]'
                }`}
            >
                {isUser ? (
                    <p className="whitespace-pre-wrap font-medium">{message.content}</p>
                ) : (
                    <ReactMarkdown
                        skipHtml
                        components={{
                            a: ({ ...props }) => (
                                <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-acid underline underline-offset-2 hover:opacity-80 transition-opacity"
                                />
                            ),
                            p: ({ ...props }) => <p {...props} className="mb-3 last:mb-0" />,
                            ul: ({ ...props }) => <ul {...props} className="list-disc list-inside mb-3 space-y-1.5" />,
                            ol: ({ ...props }) => <ol {...props} className="list-decimal list-inside mb-3 space-y-1.5" />,
                            code: ({ ...props }) => (
                                <code {...props} className="bg-[rgba(243,240,232,0.08)] px-1.5 py-0.5 rounded-[4px] text-[0.8125rem] font-mono text-[rgba(243,240,232,0.75)]" />
                            ),
                            pre: ({ ...props }) => (
                                <pre {...props} className="bg-[rgba(243,240,232,0.05)] p-4 rounded-[8px] overflow-x-auto mb-3 text-[0.8125rem] font-mono border border-[rgba(243,240,232,0.08)]" />
                            ),
                            strong: ({ ...props }) => <strong {...props} className="font-semibold text-paper" />,
                            h3: ({ ...props }) => <h3 {...props} className="font-semibold text-paper text-base mt-4 mb-2" />,
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                )}
            </div>

            {isUser && (
                <div className="flex-shrink-0 ml-4 mt-0.5 pt-1">
                    <span className="text-[0.5625rem] font-bold tracking-[0.14em] uppercase text-[rgba(243,240,232,0.30)]">You</span>
                </div>
            )}
        </div>
    );
}
