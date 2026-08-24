'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const VisualBreak = () => {
    return (
        <section aria-label="Visual pause" className="relative overflow-hidden" style={{ height: 'clamp(380px, 55vw, 700px)' }}>
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.04 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image
                    src="/images/ChatGPT Image Aug 12, 2026, 04_40_21 PM.png"
                    alt="Atmospheric landscape — visual transition"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority={false}
                />
            </motion.div>

            {/* Top fade — from PAPER (manifesto above) */}
            <div
                className="absolute inset-x-0 top-0 h-24 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to bottom, #151515, transparent)' }}
            />

            {/* Bottom fade — to PAPER (selected work below) */}
            <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to top, #F3F0E8, transparent)' }}
            />

            {/* Subtle label */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <span
                    className="text-micro text-white/40 tracking-[0.2em]"
                    aria-hidden="true"
                >
                    — — —
                </span>
            </div>
        </section>
    );
};
