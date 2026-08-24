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

const PHASES = [
    {
        number: '01',
        title: 'Data Quality',
        description: 'Validation and audit across equity and NIFTY options CSV datasets. Pattern detection for missing, malformed, and outlier entries.',
        detail: 'Python · Pandas · NumPy',
    },
    {
        number: '02',
        title: 'Wave Detection',
        description: 'Algorithm implementation for identifying MW/DW waveform patterns within price series. State-machine driven detection logic.',
        detail: 'Python · algorithm design',
    },
    {
        number: '03',
        title: 'MW/DW State',
        description: 'State tracking and event logging across market cycles. Building the structured representation of MW and DW phase transitions.',
        detail: 'Python · data modelling',
    },
    {
        number: '04',
        title: 'Events / Excursions',
        description: 'Analysis pipeline for excursion events within MW/DW structures. Quantifying and categorising behavioral patterns.',
        detail: 'Python · statistical analysis',
    },
    {
        number: '05',
        title: 'Analytics / Heatmaps',
        description: 'Visualization output and heatmap generation for research results. Converting pipeline output to structured analytical artifacts.',
        detail: 'Python · Pandas · visualization',
    },
];

export const ResearchPipeline = () => {
    return (
        <section id="research" className="bg-ink section-pad-lg" aria-label="MW/DW research pipeline">
            <div className="editorial-container">
                {/* Header */}
                <motion.div
                    className="mb-[clamp(2.5rem,5dvh,5rem)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <span className="text-micro text-[rgba(200,255,56,0.60)] block mb-[clamp(0.75rem,2dvh,1rem)]">
                        07 / RESEARCH INFRASTRUCTURE
                    </span>
                    <h2
                        className="text-paper font-bold tracking-[-0.04em] leading-[0.93] mb-[clamp(1rem,2dvh,1.5rem)]"
                        style={{ fontSize: 'clamp(2rem, min(5vw, 7dvh), 4.5rem)' }}
                    >
                        MW/DW Research
                        <br />
                        <span className="text-[rgba(243,240,232,0.38)]">Python backtesting pipeline</span>
                    </h2>
                    <p className="text-[rgba(243,240,232,0.50)] text-base leading-relaxed max-w-[520px]">
                        Five-phase research infrastructure for market wave detection,
                        state analysis, and backtesting — built independently at TG Levels.
                    </p>
                </motion.div>

                {/* Pipeline visualization */}
                <div className="relative">
                    {/* Vertical connector line */}
                    <div
                        className="absolute left-[calc(clamp(1.25rem,5vw,5rem)+1.5rem)] top-0 bottom-0 w-px bg-[rgba(243,240,232,0.08)] hidden md:block"
                        aria-hidden="true"
                    />

                    <div className="space-y-0">
                        {PHASES.map((phase, idx) => (
                            <motion.div
                                key={phase.number}
                                variants={fadeUp(idx * 0.07)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                                className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-[clamp(1.5rem,3dvh,3rem)] py-[clamp(1.5rem,3.5dvh,2.5rem)] border-b border-[rgba(243,240,232,0.07)]"
                            >
                                {/* Phase number */}
                                <div className="flex items-start gap-4 md:flex-col md:gap-0">
                                    <span className="text-acid font-bold tracking-[0.04em]" style={{ fontSize: 'clamp(1.25rem, 2dvh, 1.5rem)' }}>
                                        {phase.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[clamp(1rem,2dvh,4rem)] items-start">
                                    <div>
                                        <h3
                                            className="text-paper font-semibold tracking-[-0.025em] mb-[clamp(0.5rem,1.5dvh,0.75rem)]"
                                            style={{ fontSize: 'clamp(1.1rem, min(2vw, 2.5dvh), 1.5rem)' }}
                                        >
                                            {phase.title}
                                        </h3>
                                        <p className="text-[rgba(243,240,232,0.48)] text-[0.9375rem] leading-relaxed max-w-[600px]">
                                            {phase.description}
                                        </p>
                                    </div>
                                    <span className="text-[0.75rem] font-mono text-[rgba(243,240,232,0.28)] whitespace-nowrap">
                                        {phase.detail}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Context note */}
                <motion.div
                    className="mt-[clamp(2.5rem,5dvh,4rem)] pt-[clamp(1.5rem,3dvh,2rem)] border-t border-[rgba(243,240,232,0.08)]"
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                >
                    <p className="text-[rgba(243,240,232,0.36)] text-[0.8125rem] leading-relaxed max-w-[640px]">
                        This pipeline was a dedicated research workstream at TG Levels,
                        distinct from the CRM frontend build and the TGGD trading application
                        integration work. CSV equity/NIFTY options datasets were converted
                        to partitioned Parquet for efficient analysis.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
