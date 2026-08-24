'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSkills } from '@/lib/data-loader';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
    },
});

const CAPABILITY_LABELS: Record<string, string> = {
    'Frontend Development': 'Frontend',
    'Backend Development': 'Backend',
    'Real-Time & Distributed Systems': 'Real-time',
    'Databases': 'Data',
    'Observability & DevOps': 'Infrastructure',
    'AI & Intelligent Systems': 'AI',
    'Testing': 'Testing',
};

export const EngineeringCapabilities = () => {
    const { categories } = getSkills();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return (
        <section id="capabilities" className="bg-soft section-pad" aria-label="Engineering capabilities">
            <div className="editorial-container">
                {/* Header */}
                <motion.div
                    className="mb-[clamp(2.5rem,5dvh,5rem)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.38)] block mb-[clamp(0.75rem,2dvh,1rem)]">
                        04 / CAPABILITIES
                    </span>
                    <h2
                        className="text-ink font-bold tracking-[-0.035em] leading-[0.96] mb-[clamp(1rem,3dvh,1.5rem)]"
                        style={{ fontSize: 'clamp(2rem, min(5vw, 7dvh), 4.5rem)' }}
                    >
                        I work across
                    </h2>
                    <p className="text-[rgba(21,21,21,0.48)] text-[0.9375rem]">
                        Select a discipline to see the technologies.
                    </p>
                </motion.div>

                {/* Typographic capability map */}
                <motion.div
                    className="flex flex-wrap gap-[clamp(0.75rem,2dvh,1rem)] mb-[clamp(2.5rem,5dvh,4rem)]"
                    variants={fadeUp(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {categories.map((cat) => {
                        const label = CAPABILITY_LABELS[cat.name] ?? cat.name;
                        const isActive = activeCategory === cat.name;
                        return (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(isActive ? null : cat.name)}
                                className="group relative"
                                aria-expanded={isActive}
                                aria-label={`Toggle ${label} technologies`}
                            >
                                <span
                                    className={`block font-bold tracking-[-0.03em] transition-colors duration-200 ${
                                        isActive
                                            ? 'text-ink'
                                            : 'text-[rgba(21,21,21,0.28)] hover:text-[rgba(21,21,21,0.65)]'
                                    }`}
                                    style={{ fontSize: 'clamp(1.5rem, min(3.5vw, 5dvh), 2.75rem)' }}
                                >
                                    {label}
                                    {isActive && (
                                        <span className="text-acid ml-1" aria-hidden="true">.</span>
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* Technology reveal */}
                <AnimatePresence mode="wait">
                    {activeCategory && (
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-[rgba(21,21,21,0.12)] pt-8"
                        >
                            <p className="text-micro text-[rgba(21,21,21,0.35)] mb-5">
                                {activeCategory}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {categories
                                    .find((c) => c.name === activeCategory)
                                    ?.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-[0.875rem] font-medium text-ink bg-[rgba(21,21,21,0.06)] border border-[rgba(21,21,21,0.10)] px-3 py-1.5 rounded-[10px]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Technology list — always visible as metadata */}
                {!activeCategory && (
                    <motion.div
                        className="border-t border-[rgba(21,21,21,0.10)] pt-[clamp(1.5rem,4dvh,2rem)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2dvh,1.5rem)]"
                        variants={fadeUp(0.15)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                    >
                        {[
                            'Next.js / React / TypeScript',
                            'Node.js / Express / PostgreSQL',
                            'Python / FastAPI / Django',
                            'Redis / WebSockets / Socket.IO',
                            'Docker / CI/CD / Vercel / Railway',
                            'Groq AI / LLM integration / RAG',
                        ].map((line) => (
                            <p key={line} className="text-[0.875rem] text-[rgba(21,21,21,0.45)] font-mono leading-relaxed">
                                {line}
                            </p>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};
