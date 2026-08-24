'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getProjects } from '@/lib/data-loader';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
});

export const SelectedWork = () => {
    const { projects } = getProjects();
    const flagships = projects.filter((p) => p.isFlagship || p.featured).slice(0, 2);

    return (
        <section id="work" className="bg-paper section-pad" aria-label="Selected work">
            <div className="editorial-container">
                {/* Section header */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-20 pb-6 border-b border-[rgba(21,21,21,0.10)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div>
                        <span className="text-micro text-[rgba(21,21,21,0.40)] block mb-3">
                            02 / SELECTED WORK
                        </span>
                        <h2
                            className="text-ink font-bold tracking-[-0.04em] leading-[0.94]"
                            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)' }}
                        >
                            Production systems
                            <br />and real applications.
                        </h2>
                    </div>
                    <p className="text-[rgba(21,21,21,0.48)] text-[0.9375rem] max-w-[320px] md:text-right md:pb-1">
                        Independent projects built from architecture decisions through deployment.
                    </p>
                </motion.div>

                {/* Featured projects — large format */}
                <div className="space-y-16 md:space-y-24">
                    {flagships.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            variants={fadeUp(idx * 0.08)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            className="group"
                        >
                            <Link href={`/projects/${project.id}`} className="block" aria-label={`View ${project.title} case study`}>
                                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-16 items-start">
                                    {/* Index + title column */}
                                    <div className="lg:w-[320px] flex-shrink-0">
                                        <span className="text-micro text-[rgba(21,21,21,0.30)] block mb-4">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <h3
                                            className="text-ink font-bold tracking-[-0.035em] leading-[0.96] mb-5 group-hover:text-cobalt transition-colors duration-300"
                                            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-[rgba(21,21,21,0.55)] text-[0.9375rem] leading-relaxed mb-6">
                                            {project.impactStatement}
                                        </p>
                                        {/* Tech row */}
                                        <div className="flex flex-wrap gap-1.5 mb-6">
                                            {project.techStack.slice(0, 5).map((tech) => (
                                                <span key={tech} className="tech-tag">{tech}</span>
                                            ))}
                                            {project.techStack.length > 5 && (
                                                <span className="tech-tag">+{project.techStack.length - 5}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-[0.8125rem] font-semibold text-cobalt group-hover:gap-3 transition-all duration-300">
                                            View case study
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Status + metadata column */}
                                    <div className="flex flex-col justify-start gap-6 md:pt-10">
                                        <div className="flex flex-wrap gap-3">
                                            <span
                                                className="inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.10em] uppercase text-ink"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-acid" aria-hidden="true" />
                                                {project.status}
                                            </span>
                                            <span className="text-micro text-[rgba(21,21,21,0.35)]">
                                                {project.complexityLevel}
                                            </span>
                                        </div>
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags?.slice(0, 4).map((tag: string) => (
                                                <span key={tag} className="text-[0.625rem] font-medium text-[rgba(21,21,21,0.42)] border border-[rgba(21,21,21,0.10)] px-2.5 py-1 rounded-[4px]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {/* Links */}
                                        <div className="flex flex-wrap gap-4 mt-auto pt-4">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-[rgba(21,21,21,0.42)] hover:text-ink transition-colors duration-200"
                                                >
                                                    GitHub ↗
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[0.75rem] font-semibold tracking-[0.08em] uppercase text-[rgba(21,21,21,0.42)] hover:text-cobalt transition-colors duration-200"
                                                >
                                                    Live ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Row separator */}
                            {idx < flagships.length - 1 && (
                                <div className="mt-16 md:mt-24 border-t border-[rgba(21,21,21,0.08)]" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
