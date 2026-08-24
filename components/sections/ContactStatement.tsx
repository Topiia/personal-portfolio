'use client';

import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
});

export const ContactStatement = () => {
    return (
        <section id="contact" className="bg-ink section-pad-lg" aria-label="Contact">
            <div className="editorial-container">
                {/* Label */}
                <motion.span
                    className="text-micro text-[rgba(200,255,56,0.60)] block mb-[clamp(2.5rem,6dvh,4rem)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    10 / CONTACT
                </motion.span>

                {/* Large statement */}
                <motion.h2
                    className="text-paper font-bold tracking-[-0.04em] leading-[0.92] mb-[clamp(2.5rem,8dvh,3.5rem)]"
                    style={{ fontSize: 'clamp(2.5rem, min(8vw, 10dvh), 7rem)' }}
                    variants={fadeUp(0.06)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    Have a difficult
                    <br />
                    system to build?
                </motion.h2>

                {/* Supporting text + email */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-[clamp(2.5rem,6dvh,4rem)] items-end"
                    variants={fadeUp(0.14)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div>
                        <p className="text-[rgba(243,240,232,0.52)] text-lg leading-relaxed max-w-[480px] mb-[clamp(1.5rem,4dvh,2.5rem)]">
                            I&apos;m available for full-time engineering roles and
                            meaningful freelance projects — especially those involving
                            complex backend systems, real-time infrastructure, or
                            security-critical architecture.
                        </p>

                        {/* Primary CTA */}
                        <a
                            href="mailto:ankitsinghak3028@gmail.com"
                            id="contact-email-cta"
                            className="btn-acid text-base inline-flex"
                            style={{ padding: '1rem 2rem', borderRadius: '16px', fontSize: '1rem' }}
                        >
                            ankitsinghak3028@gmail.com
                        </a>
                    </div>

                    {/* Secondary links */}
                    <div className="flex flex-row md:flex-col gap-[clamp(1rem,2.5dvh,1.5rem)] md:items-end">
                        <a
                            href="https://github.com/Topiia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase text-[rgba(243,240,232,0.38)] hover:text-paper transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub ↗
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ankit-singh-b7227928a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase text-[rgba(243,240,232,0.38)] hover:text-paper transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn ↗
                        </a>
                        <a
                            href="/resume.pdf"
                            download="Ankit_Singh_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[0.8125rem] font-semibold tracking-[0.08em] uppercase text-[rgba(243,240,232,0.38)] hover:text-paper transition-colors duration-200"
                        >
                            Resume ↗
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
