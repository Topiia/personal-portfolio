'use client';

import React from 'react';

// FloatingBackground: Kept as a minimal grain texture only.
// The glowing blobs, floating icons, and radial glows were removed
// to match the editorial dark aesthetic — they added visual noise
// that competed with the typography-led design.
export const FloatingBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
            {/* Subtle grain texture for depth */}
            <div
                className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
