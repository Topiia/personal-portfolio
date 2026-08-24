'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CapsuleArchitectureDiagram } from '@/components/ui/CapsuleArchitectureDiagram';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
});

const CAPSULE_EVIDENCE = [
    '45+ REST endpoints',
    'JWT rotation + reuse detection',
    'HttpOnly cookie authentication',
    'Redis cache-aside strategy',
    'Bull queue system + workers',
    'AI moderation pipeline (Groq)',
    'Dead-letter queue (DLQ)',
    'Prometheus + Sentry observability',
    '162 passing unit & integration tests',
    'Correlation ID request tracing',
];

export const FeaturedCapsule = () => {
    return (
        <section id="capsule" className="bg-paper section-pad-lg" aria-label="Capsule flagship project">
            <div className="editorial-container">

                {/* Header row */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[clamp(1.5rem,4dvh,3rem)] items-end mb-[clamp(2rem,5dvh,5rem)] pb-[clamp(1rem,3dvh,2rem)] border-b border-[rgba(21,21,21,0.10)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div>
                        <span className="text-micro text-[rgba(21,21,21,0.40)] block mb-[clamp(0.75rem,2dvh,1.25rem)]">
                            03 / FEATURED WORK
                        </span>
                        <h2
                            className="text-ink font-bold tracking-[-0.04em] leading-[0.92] mb-[clamp(1rem,2dvh,1.5rem)]"
                            style={{ fontSize: 'clamp(2.75rem, min(7vw, 9dvh), 6rem)' }}
                        >
                            CAPSULE
                        </h2>
                        <p className="text-[rgba(21,21,21,0.60)] text-lg md:text-xl leading-relaxed max-w-[600px]">
                            Secure AI-moderated visual vlogging platform with
                            security-first architecture, async processing pipelines,
                            and production observability.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 md:items-end md:pb-2">
                        <span className="text-micro text-ink">Production-Ready</span>
                        <span className="text-micro text-[rgba(21,21,21,0.40)]">Senior Complexity</span>
                    </div>
                </motion.div>

                {/* Engineering thesis */}
                <motion.div
                    className="mb-[clamp(3rem,6dvh,5rem)]"
                    variants={fadeUp(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <p
                        className="text-ink font-semibold tracking-[-0.025em] leading-[1.12] max-w-[860px]"
                        style={{ fontSize: 'clamp(1.25rem, min(2.5vw, 3dvh), 2rem)' }}
                    >
                        The challenge was not making features work.
                        It was building the security perimeter, async processing,
                        and observability infrastructure that makes a content
                        platform <span className="font-serif-accent text-cobalt">trustworthy at scale.</span>
                    </p>
                </motion.div>

                {/* Evidence grid */}
                <motion.div
                    className="mb-[clamp(3rem,6dvh,5rem)]"
                    variants={fadeUp(0.14)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.40)] block mb-6">Technical evidence</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[rgba(21,21,21,0.10)]">
                        {CAPSULE_EVIDENCE.map((item) => (
                            <div
                                key={item}
                                className="bg-paper px-4 py-4 text-[0.75rem] font-medium text-[rgba(21,21,21,0.55)] leading-snug hover:text-ink hover:bg-[rgba(21,21,21,0.04)] transition-colors duration-200"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Architecture diagram */}
                <motion.div
                    className="mb-[clamp(2.5rem,5dvh,4rem)]"
                    variants={fadeUp(0.2)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.40)] block mb-6">System architecture</span>
                    <CapsuleArchitectureDiagram />
                </motion.div>

                {/* Links */}
                <motion.div
                    className="flex flex-wrap items-center gap-4"
                    variants={fadeUp(0.26)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <Link href="/projects/capsule" className="btn-acid">
                        Full case study
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <a
                        href="https://github.com/Topiia/Capsule"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                    >
                        GitHub ↗
                    </a>
                    <a
                        href="https://capsule.topiiaa.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.8125rem] font-semibold text-[rgba(21,21,21,0.42)] hover:text-ink transition-colors duration-200"
                    >
                        Live site ↗
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
