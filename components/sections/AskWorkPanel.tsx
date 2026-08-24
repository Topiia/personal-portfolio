'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BackgroundVisual } from '@/components/ui/BackgroundVisual';

const STARTER_PROMPTS = [
    'How did you build Capsule?',
    'Tell me about the TG Levels internship.',
    'What backend systems have you built?',
    'Explain the MW/DW research work.',
    'What makes your projects production-oriented?',
];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
    },
});

export const AskWorkPanel = () => {
    return (
        <section id="ai" className="relative bg-ink section-pad-lg overflow-hidden" aria-label="Ask about the work">
            {/* Background Image */}
            <BackgroundVisual
                src="/images/07-ai-chat-visual.webp"
                alt="Atmospheric AI workspace"
                theme="dark"
                imageType="atmospheric"
                contentAlignment="left"
                focalPosition="object-[center_30%]"
            />

            <div className="relative z-10 editorial-container">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-[clamp(2rem,5dvh,5rem)] items-start">
                    {/* Left: invitation */}
                    <div>
                        <motion.span
                            className="text-micro text-[rgba(200,255,56,0.60)] block mb-[clamp(1rem,2dvh,1.5rem)]"
                            variants={fadeUp(0)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            09 / AI LAYER
                        </motion.span>

                        <motion.h2
                            className="text-paper font-bold tracking-[-0.04em] leading-[0.93] mb-[clamp(1.5rem,3dvh,2rem)]"
                            style={{ fontSize: 'clamp(2.25rem, min(6vw, 8dvh), 5.25rem)' }}
                            variants={fadeUp(0.06)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            Ask about
                            <br />
                            the work.
                        </motion.h2>

                        <motion.p
                            className="text-[rgba(243,240,232,0.50)] text-lg leading-relaxed max-w-[440px] mb-[clamp(1.5rem,4dvh,2.5rem)]"
                            variants={fadeUp(0.12)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            An AI that knows the projects, the engineering decisions,
                            the architecture, and the context behind the work.
                            Not a generic chatbot.
                        </motion.p>

                        <motion.div
                            variants={fadeUp(0.18)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-80px' }}
                        >
                            <Link href="/ai-chat" className="btn-acid inline-flex" id="ai-panel-cta">
                                Start a conversation
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="ml-2">
                                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: starter prompts */}
                    <motion.div
                        className="flex flex-col gap-[clamp(0.5rem,1.5dvh,0.75rem)]"
                        variants={fadeUp(0.14)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <p className="text-micro text-[rgba(243,240,232,0.30)] mb-[clamp(0.25rem,1dvh,0.5rem)]">Suggested questions</p>
                        {STARTER_PROMPTS.map((prompt) => (
                            <Link
                                key={prompt}
                                href={`/ai-chat?q=${encodeURIComponent(prompt)}`}
                                className="group flex items-start justify-between gap-4 px-5 py-4 border border-[rgba(243,240,232,0.10)] rounded-[14px] hover:border-[rgba(200,255,56,0.35)] hover:bg-[rgba(243,240,232,0.04)] transition-all duration-250"
                            >
                                <span className="text-[0.9375rem] text-[rgba(243,240,232,0.55)] group-hover:text-paper transition-colors duration-200 leading-snug">
                                    {prompt}
                                </span>
                                <span className="text-[rgba(243,240,232,0.25)] group-hover:text-acid transition-colors duration-200 mt-0.5 flex-shrink-0">
                                    →
                                </span>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
