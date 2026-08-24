'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getProjects } from '@/lib/data-loader';

const CATEGORY_MAP: Record<string, string> = {
    'capsule': 'Full-stack platform',
    'topia-aggregator': 'Distributed pipeline',
    'cryptodash': 'Real-time systems',
    'system-pulse': 'Monitoring systems',
    'sky-link': 'Simulation',
    'agile-almanac': 'Collaboration tools',
};

const IMAGE_MAP: Record<string, string> = {
    'capsule': '/images/ChatGPT Image Aug 24, 2026, 12_51_46 PM.png',
    'topia-aggregator': '/images/ChatGPT Image Aug 24, 2026, 12_52_27 PM (1).png',
    'cryptodash': '/images/ChatGPT Image Aug 12, 2026, 04_40_21 PM.png',
    'system-pulse': '/images/ChatGPT Image Aug 24, 2026, 12_39_31 PM.png',
    'sky-link': '/images/ChatGPT Image Aug 24, 2026, 12_51_46 PM.png',
    'agile-almanac': '/images/ChatGPT Image Aug 24, 2026, 12_52_27 PM (1).png',
};

export const ProjectIndex = () => {
    const { projects } = getProjects();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Sort: non-flagship projects by orderIndex
    const indexProjects = projects
        .filter((p) => !p.isFlagship)
        .sort((a, b) => a.orderIndex - b.orderIndex);

    return (
        <section id="projects" className="bg-paper section-pad" aria-label="Project index">
            <div className="editorial-container">
                {/* Header */}
                <motion.div
                    className="mb-10 md:mb-14 pb-6 border-b border-[rgba(21,21,21,0.10)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.40)] block mb-3">
                        03 / PROJECT INDEX
                    </span>
                    <h2
                        className="text-ink font-bold tracking-[-0.035em]"
                        style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}
                    >
                        All projects
                    </h2>
                </motion.div>

                {/* Editorial list */}
                <div className="relative">
                    {/* Hover image preview — fixed position inside container */}
                    <AnimatePresence>
                        {hoveredId && IMAGE_MAP[hoveredId] && (
                            <motion.div
                                key={hoveredId}
                                className="absolute right-0 top-1/4 w-[220px] h-[160px] overflow-hidden pointer-events-none z-10 hidden lg:block"
                                style={{ borderRadius: '20px' }}
                                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 4 }}
                                transition={{ duration: 0.25 }}
                            >
                                <Image
                                    src={IMAGE_MAP[hoveredId]}
                                    alt=""
                                    fill
                                    sizes="220px"
                                    className="object-cover"
                                    aria-hidden="true"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {indexProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.55, delay: idx * 0.06 }}
                        >
                            <Link
                                href={`/projects/${project.id}`}
                                className="group block border-b border-[rgba(21,21,21,0.09)] py-6 md:py-7 hover:bg-[rgba(21,21,21,0.02)] transition-colors duration-200"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onFocus={() => setHoveredId(project.id)}
                                onBlur={() => setHoveredId(null)}
                                aria-label={`View ${project.title} case study`}
                            >
                                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[56px_1fr_auto_auto_auto] gap-4 md:gap-8 items-center">
                                    {/* Number */}
                                    <span className="text-micro text-[rgba(21,21,21,0.28)] w-10 flex-shrink-0">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>

                                    {/* Name + descriptor */}
                                    <div className="min-w-0">
                                        <p
                                            className="text-ink font-semibold tracking-[-0.02em] group-hover:translate-x-1.5 transition-transform duration-300 truncate"
                                            style={{ fontSize: 'clamp(1rem, 2vw, 1.375rem)' }}
                                        >
                                            {project.title.replace(/ - .*$/, '').replace(/TOPIA.*/, 'TOPIA')}
                                        </p>
                                        <p className="text-[0.8125rem] text-[rgba(21,21,21,0.44)] mt-0.5 hidden md:block truncate">
                                            {project.impactStatement.slice(0, 80)}{project.impactStatement.length > 80 ? '…' : ''}
                                        </p>
                                    </div>

                                    {/* Category */}
                                    <span className="hidden md:block text-[0.75rem] font-medium text-[rgba(21,21,21,0.40)] whitespace-nowrap">
                                        {CATEGORY_MAP[project.id] ?? 'Engineering'}
                                    </span>

                                    {/* Status */}
                                    <span className="hidden md:flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase text-[rgba(21,21,21,0.38)] whitespace-nowrap">
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${project.status === 'Live' || project.status === 'Production-Ready' ? 'bg-acid' : 'bg-[rgba(21,21,21,0.25)]'}`} aria-hidden="true" />
                                        {project.status}
                                    </span>

                                    {/* Arrow */}
                                    <span className="text-[rgba(21,21,21,0.28)] group-hover:text-cobalt group-hover:translate-x-1 transition-all duration-300" aria-hidden="true">
                                        →
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
