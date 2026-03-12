'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectWithMedia } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { ProjectCardMedia } from '@/components/ui/ProjectCardMedia';

interface FlagshipProjectProps {
    project: ProjectWithMedia;
}

export const FlagshipProject: React.FC<FlagshipProjectProps> = ({ project }) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    if (!project) return null;

    return (
        <section className="relative w-full">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative border border-border rounded-[16px] sm:rounded-[20px] md:rounded-[24px] p-5 sm:p-7 md:p-[48px] mb-16 sm:mb-20 md:mb-[120px] bg-card overflow-hidden"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start relative z-10">
                    {/* Left Column: Content */}
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white bg-accent rounded-full shadow-md">
                                FLAGSHIP PROJECT
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight text-textHeading font-outfit break-words">
                                {project.title}
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-textMuted font-light leading-relaxed mb-5 sm:mb-6 md:mb-8 border-l-4 border-accent pl-4 sm:pl-6">
                                {project.impactStatement}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {project.scalability?.badges.map((badge) => (
                                    <span key={badge} className="px-3 py-1 text-xs font-medium text-textHeading bg-surface border border-border rounded-md shadow-sm">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Executive Summary */}
                        <div className="bg-surface/60 rounded-xl p-4 sm:p-5 md:p-6 border border-border backdrop-blur-md shadow-sm">
                            <h3 className="text-lg font-bold text-textHeading mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Executive Summary
                            </h3>
                            <p className="text-textMuted leading-relaxed mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="px-2 py-1 text-xs font-mono text-textHeading bg-surface border border-border rounded shadow-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            {project.githubUrl && (
                                <Button href={project.githubUrl} variant="outline" size="lg" target="_blank" rel="noopener noreferrer">
                                    View Repository
                                </Button>
                            )}
                            {project.liveUrl && (
                                <Button href={project.liveUrl} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
                                    View Deployment
                                </Button>
                            )}
                            <Link href={`/projects/${project.id}`}>
                                <Button variant="outline" size="lg">
                                    View More
                                </Button>
                            </Link>
                        </div>

                        {/* Desktop Only: Deep Dive Sections & Images */}
                        <div className="hidden lg:flex flex-col space-y-8 pt-8">
                            {/* Architecture Breakdown */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-textHeading mb-6">Architecture Breakdown</h3>
                                {project.architectureBreakdown && Object.entries(project.architectureBreakdown).map(([key, section]: [string, any]) => {
                                    if (key === 'systemStructure') return null; // Already rendered
                                    return (
                                        <div key={`desktop-${key}`} className="border border-border rounded-lg overflow-hidden bg-surface/40 shadow-sm">
                                            <button
                                                onClick={() => toggleSection(`desktop-${key}`)}
                                                className="w-full flex justify-between items-center p-4 text-left hover:bg-surface/60 transition-colors"
                                            >
                                                <span className="font-semibold text-textHeading">{section.title}</span>
                                                <span className={cn("transform transition-transform duration-300 text-accent", activeSection === `desktop-${key}` ? "rotate-180" : "")}>
                                                    ▼
                                                </span>
                                            </button>
                                            <AnimatePresence>
                                                {activeSection === `desktop-${key}` && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 pt-0 text-sm text-textMuted space-y-2 border-t border-border bg-surface/20">
                                                            <ul className="list-disc pl-5 space-y-1">
                                                                {section.items.map((item: string, i: number) => (
                                                                    <li key={`d-item-${i}`}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Engineering Decisions */}
                            <div className="bg-surface/40 rounded-xl p-6 border border-border shadow-sm">
                                <h3 className="text-xl font-bold text-textHeading mb-4">Engineering Decisions</h3>
                                <ul className="space-y-3">
                                    {project.engineeringDecisions?.map((decision, i) => (
                                        <li key={`desktop-eng-${i}`} className="flex items-start gap-3 text-sm text-textMuted">
                                            <span className="text-accent mt-1">▹</span>
                                            {decision}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Visuals & Architecture */}
                    <div className="space-y-8 lg:flex lg:flex-col lg:space-y-6 lg:pt-8">
                        {/* Preview Image/Video Container */}
                        <div className="lg:-mt-8">
                            <ProjectCardMedia
                                videos={project.media?.videos || []}
                                images={project.media?.images || []}
                                thumbnail={project.media?.thumbnail || ''}
                                title={project.title}
                            />
                        </div>

                        {/* System Architecture Diagram Block */}
                        {project.architectureBreakdown?.systemStructure && (
                            <div className="bg-surface/60 rounded-xl p-6 border border-border shadow-sm">
                                <h4 className="text-sm font-bold text-textHeading uppercase tracking-wider mb-4 text-center">System Architecture Layering</h4>
                                <div className="space-y-2">
                                    {project.architectureBreakdown.systemStructure.map((layer, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div className="w-full bg-surface hover:bg-surface/80 transition-colors p-3 rounded text-center text-sm text-textHeading border border-border font-mono shadow-sm">
                                                {layer}
                                            </div>
                                            {index < project.architectureBreakdown!.systemStructure.length - 1 && (
                                                <div className="h-4 w-px bg-border my-1"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Production Readiness (Desktop Only Right Column) */}
                        <div className="hidden lg:block bg-surface/40 rounded-xl p-6 border border-border shadow-sm">
                            <h3 className="text-xl font-bold text-textHeading mb-4">Production Readiness</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.productionReadiness?.checked.map((item, i) => (
                                    <div key={`desktop-prod-c-${i}`} className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                                        <span className="text-green-500">✔</span> {item}
                                    </div>
                                ))}
                                {project.productionReadiness?.unchecked.map((item, i) => (
                                    <div key={`desktop-prod-u-${i}`} className="flex items-center gap-2 text-xs text-orange-600/80 dark:text-orange-400/80 opacity-80">
                                        <span className="text-orange-500">⚠</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Capsule Images Row (Desktop Only Right Column) */}
                        {(project.id.toLowerCase() === 'capsule' || project.title.toLowerCase() === 'capsule') && project.media?.images && project.media.images.length >= 2 && (
                            <div className="hidden lg:flex w-full flex-row gap-2 pt-2">
                                <div className="w-1/2 aspect-video rounded-xl overflow-hidden border border-accent/20 bg-surface/40">
                                    <img src={project.media.images[0]} alt="Capsule Architecture View 1" className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="w-1/2 aspect-video rounded-xl overflow-hidden border border-accent/20 bg-surface/40">
                                    <img src={project.media.images[1]} alt="Capsule Architecture View 2" className="w-full h-full object-cover" loading="lazy" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Deep Dive Sections (Full Width) - Mobile and Tablet only */}
                <div className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:hidden">
                    {/* Architecture Breakdown Collapsibles */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-textHeading mb-6">Architecture Breakdown</h3>
                        {project.architectureBreakdown && Object.entries(project.architectureBreakdown).map(([key, section]: [string, any]) => {
                            if (key === 'systemStructure') return null; // Already rendered
                            return (
                                <div key={key} className="border border-border rounded-lg overflow-hidden bg-surface/40 shadow-sm">
                                    <button
                                        onClick={() => toggleSection(key)}
                                        className="w-full flex justify-between items-center p-4 text-left hover:bg-surface/60 transition-colors"
                                    >
                                        <span className="font-semibold text-textHeading">{section.title}</span>
                                        <span className={cn("transform transition-transform duration-300 text-accent", activeSection === key ? "rotate-180" : "")}>
                                            ▼
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {activeSection === key && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 pt-0 text-sm text-textMuted space-y-2 border-t border-border bg-surface/20">
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {section.items.map((item: string, i: number) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Engineering & Production */}
                    <div className="space-y-8">
                        {/* Engineering Decisions */}
                        <div className="bg-surface/40 rounded-xl p-6 border border-border shadow-sm">
                            <h3 className="text-xl font-bold text-textHeading mb-4">Engineering Decisions</h3>
                            <ul className="space-y-3">
                                {project.engineeringDecisions?.map((decision, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-textMuted">
                                        <span className="text-accent mt-1">▹</span>
                                        {decision}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Production Readiness */}
                        <div className="bg-surface/40 rounded-xl p-6 border border-border shadow-sm">
                            <h3 className="text-xl font-bold text-textHeading mb-4">Production Readiness</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.productionReadiness?.checked.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                                        <span className="text-green-500">✔</span> {item}
                                    </div>
                                ))}
                                {project.productionReadiness?.unchecked.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-orange-600/80 dark:text-orange-400/80 opacity-80">
                                        <span className="text-orange-500">⚠</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
