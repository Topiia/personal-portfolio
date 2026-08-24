'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
});

export const AboutSection = () => {
    return (
        <section id="about" className="bg-paper section-pad-lg" aria-label="About Ankit Singh">
            <div className="editorial-container">
                {/* Header */}
                <motion.div
                    className="mb-14 md:mb-20 pb-6 border-b border-[rgba(21,21,21,0.10)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.38)] block mb-3">
                        08 / ABOUT
                    </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 lg:gap-20 items-start">
                    {/* Left: text */}
                    <div>
                        <motion.h2
                            className="text-ink font-bold tracking-[-0.04em] leading-[0.94] mb-8"
                            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)' }}
                            variants={fadeUp(0.06)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            The kind of engineer
                            <br />
                            <span className="font-serif-accent text-[rgba(21,21,21,0.52)]" style={{ fontSize: '0.82em' }}>
                                who reads the whole stack.
                            </span>
                        </motion.h2>

                        <motion.div
                            className="space-y-5 text-[rgba(21,21,21,0.60)] text-[1.0625rem] leading-relaxed max-w-[560px]"
                            variants={fadeUp(0.12)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <p>
                                I'm a Full Stack Engineer focused on building systems that are
                                reliable, secure, and well-considered — not just functional.
                                My strongest work sits at the intersection of backend architecture,
                                real-time systems, and thoughtful product interfaces.
                            </p>
                            <p>
                                I gravitate toward problems that involve distributed state,
                                security boundaries, async processing, and high-correctness
                                environments. I care about production readiness: observability,
                                error boundaries, graceful degradation, and meaningful
                                instrumentation — not just features shipping.
                            </p>
                            <p>
                                Currently interested in backend engineering, platform/infrastructure
                                roles, and full-stack positions where depth matters.
                                Based in India, open to remote opportunities.
                            </p>
                        </motion.div>

                        {/* Quick facts */}
                        <motion.div
                            className="mt-10 grid grid-cols-2 gap-5"
                            variants={fadeUp(0.18)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            {[
                                { label: 'Location', value: 'India' },
                                { label: 'Status', value: 'Open to opportunities' },
                                { label: 'Focus', value: 'Backend + Full Stack' },
                                { label: 'Stack', value: 'Node.js · Python · Next.js' },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <span className="text-micro text-[rgba(21,21,21,0.35)] block mb-1">{label}</span>
                                    <span className="text-[0.9375rem] font-medium text-ink">{value}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Links */}
                        <motion.div
                            className="mt-10 flex flex-wrap gap-4"
                            variants={fadeUp(0.22)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                        >
                            <a
                                href="/resume.pdf"
                                download="Ankit_Singh_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-acid"
                            >
                                Download resume ↗
                            </a>
                            <a
                                href="https://github.com/Topiia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost"
                            >
                                GitHub ↗
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: photo */}
                    <motion.div
                        variants={fadeUp(0.16)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        className="flex justify-center lg:justify-start"
                    >
                        <div
                            className="relative overflow-hidden w-full max-w-[320px] lg:max-w-none"
                            style={{ borderRadius: '24px', aspectRatio: '3/4' }}
                        >
                            <Image
                                src="/images/ChatGPT Image Aug 12, 2026, 04_57_06 PM.png"
                                alt="Ankit Singh"
                                fill
                                sizes="(max-width: 1024px) 320px, 340px"
                                className="object-cover object-top"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
