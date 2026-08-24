'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getProjects } from '@/lib/data-loader';

const CATEGORY_MAP: Record<string, string> = {
    'capsule': 'Full-stack platform',
    'topia-aggregator': 'Distributed pipeline',
    'cryptodash': 'Real-time systems',
    'system-pulse': 'Monitoring systems',
    'sky-link': 'Simulation',
    'agile-almanac': 'Collaboration tools',
};

export const ProjectIndex = () => {
    const { projects } = getProjects();

    // Sort: non-flagship projects by orderIndex
    const indexProjects = projects
        .filter((p) => !p.isFlagship)
        .sort((a, b) => a.orderIndex - b.orderIndex);

    return (
        <section id="projects" className="bg-paper section-pad" aria-label="Project index">
            <div className="editorial-container">
                {/* Header */}
                <motion.div
                    className="mb-[clamp(1.5rem,4dvh,3.5rem)] pb-[clamp(1.5rem,3dvh,2rem)] border-b border-[rgba(21,21,21,0.10)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.40)] block mb-[clamp(0.5rem,1.5dvh,1rem)]">
                        03 / PROJECT INDEX
                    </span>
                    <h2
                        className="text-ink font-bold tracking-[-0.035em]"
                        style={{ fontSize: 'clamp(1.75rem, min(4vw, 5dvh), 3.25rem)' }}
                    >
                        All projects
                    </h2>
                </motion.div>

                {/* Editorial list */}
                <div className="relative">
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
                                className="group block border-b border-[rgba(21,21,21,0.09)] py-[clamp(1rem,3dvh,2rem)] hover:bg-[rgba(21,21,21,0.02)] transition-colors duration-200"
                                aria-label={`View ${project.title} case study`}
                            >
                                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[56px_1fr_auto_auto_auto] gap-[clamp(1rem,3dvh,2rem)] items-center">
                                    {/* Number */}
                                    <span className="text-micro text-[rgba(21,21,21,0.28)] w-10 flex-shrink-0">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>

                                    {/* Name + descriptor */}
                                    <div className="min-w-0">
                                        <p
                                            className="text-ink font-semibold tracking-[-0.02em] group-hover:translate-x-1.5 transition-transform duration-300 truncate"
                                            style={{ fontSize: 'clamp(1rem, min(2vw, 2.5dvh), 1.375rem)' }}
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
