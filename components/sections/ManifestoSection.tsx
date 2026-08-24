'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
        <section id="approach" className="bg-ink section-pad-lg" aria-label="Engineering approach">
            <div className="editorial-container">

                {/* Section index label */}
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-10 md:mb-14"
                >
                    <span className="text-micro text-[rgba(200,255,56,0.70)]">
                        01 / APPROACH
                    </span>
                </motion.div>

                {/* Large editorial statement */}
                <motion.h2
                    className="text-paper font-bold leading-[0.94] tracking-[-0.04em] mb-10 md:mb-14 max-w-[1000px]"
                    style={{ fontSize: 'clamp(2.25rem, 6vw, 5.25rem)' }}
                    variants={fadeUp(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    Great software is not only
                    about making features work.
                    It is about understanding
                    the constraints around them.
                </motion.h2>

                {/* Supporting paragraph + rule */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-16 pt-10 md:pt-14 border-t border-[rgba(243,240,232,0.10)]"
                    variants={fadeUp(0.18)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <p className="text-[rgba(243,240,232,0.58)] text-lg leading-relaxed max-w-[520px]">
                        I build across backend architecture, real-time systems,
                        distributed data pipelines, and AI services — always with
                        a focus on reliability, security, and production-readiness
                        over surface-level completion.
                    </p>

                    <div className="flex flex-col gap-5 md:pt-1">
                        {[
                            'Architecture & distributed systems',
                            'Security-first API design',
                            'Async worker & queue architectures',
                            'Production observability',
                            'Real-time interfaces',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-acid flex-shrink-0" aria-hidden="true" />
                                <span className="text-[0.9375rem] text-[rgba(243,240,232,0.56)]">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
