'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundVisual } from '@/components/ui/BackgroundVisual';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
    },
});

export const ManifestoSection = () => {
    return (
        <section id="approach" className="relative overflow-hidden bg-ink py-[clamp(4rem,8dvh,8rem)] flex items-center" aria-label="Engineering approach">
            
            {/* Background Image */}
            <BackgroundVisual
                src="/images/05-visual-break-01.webp"
                theme="dark"
                imageType="atmospheric"
                contentAlignment="left"
                focalPosition="object-center"
                topBlend={true}
                bottomBlend={true}
            />

            <div className="editorial-container relative z-10 w-full">

                {/* Section index label */}
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-[clamp(1.5rem,4dvh,3.5rem)]"
                >
                    <span className="text-micro text-[rgba(200,255,56,0.80)] font-semibold shadow-sm">
                        01 / APPROACH
                    </span>
                </motion.div>

                {/* Large editorial statement */}
                <motion.h2
                    className="text-paper font-bold leading-[0.88] tracking-[-0.04em] mb-[clamp(2rem,5dvh,4rem)] max-w-[1000px]"
                    style={{ fontSize: 'clamp(2rem, min(6vw, 8.5dvh), 4.75rem)' }}
                    variants={fadeUp(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    Great software is not only<br className="hidden sm:block" />
                    about making features work.<br className="hidden sm:block" />
                    It is about understanding<br className="hidden sm:block" />
                    the constraints around them.
                </motion.h2>

                {/* Supporting paragraph + rule */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-[clamp(1.5rem,4dvh,4rem)] pt-[clamp(1.5rem,4dvh,3.5rem)] border-t border-[rgba(243,240,232,0.15)]"
                    variants={fadeUp(0.18)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <p className="text-[rgba(243,240,232,0.75)] text-[clamp(1rem,min(2vw,2.5dvh),1.125rem)] leading-relaxed max-w-[520px]">
                        I build across backend architecture, real-time systems,
                        distributed data pipelines, and AI services — always with
                        a focus on reliability, security, and production-readiness
                        over surface-level completion.
                    </p>

                    <div className="flex flex-col gap-[clamp(0.75rem,2dvh,1.25rem)] md:pt-1">
                        {[
                            'Architecture & distributed systems',
                            'Security-first API design',
                            'Async worker & queue architectures',
                            'Production observability',
                            'Real-time interfaces',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-acid flex-shrink-0" aria-hidden="true" />
                                <span className="text-[clamp(0.875rem,min(1.5vw,2dvh),0.9375rem)] text-[rgba(243,240,232,0.75)]">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
