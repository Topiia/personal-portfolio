'use client';

import React, { useRef, useEffect, useState, KeyboardEvent } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
        }
    }, [value]);

    const handleSend = () => {
        const trimmed = value.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setValue('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex items-end gap-3 bg-[rgba(243,240,232,0.05)] border border-[rgba(243,240,232,0.12)] rounded-[14px] px-4 py-3 focus-within:border-[rgba(200,255,56,0.40)] transition-colors duration-200">
            <textarea
                ref={textareaRef}
                rows={1}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder="Ask about projects, decisions, or architecture…"
                className="flex-1 resize-none bg-transparent text-[0.9375rem] text-paper placeholder:text-[rgba(243,240,232,0.28)] outline-none leading-relaxed max-h-40"
                aria-label="Chat message input"
            />
            <button
                onClick={handleSend}
                disabled={disabled || !value.trim()}
                aria-label="Send message"
                className="flex-shrink-0 w-8 h-8 rounded-[10px] bg-acid hover:opacity-88 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            >
                <svg className="w-3.5 h-3.5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19V5m-7 7l7-7 7 7" />
                </svg>
            </button>
        </div>
    );
}
