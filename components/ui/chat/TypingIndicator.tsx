'use client';

import React from 'react';

export function TypingIndicator() {
    return (
        <div className="flex items-center gap-4 mb-6 justify-start">
            <span className="text-[0.5625rem] font-bold tracking-[0.14em] uppercase text-acid flex-shrink-0">AI</span>
            <div className="flex items-center gap-1.5 py-1">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-acid/60 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                        aria-hidden="true"
                    />
                ))}
            </div>
        </div>
    );
}
