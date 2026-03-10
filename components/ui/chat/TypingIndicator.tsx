'use client';

import React from 'react';

export function TypingIndicator() {
    return (
        <div className="flex items-center gap-2 mb-4 justify-start">
            <div className="flex-shrink-0 mr-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/80 to-primary/80 flex items-center justify-center text-xs font-bold text-white">
                    AI
                </div>
            </div>
            <div className="bg-surface border border-border/20 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                        <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
