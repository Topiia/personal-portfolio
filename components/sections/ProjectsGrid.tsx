'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FlagshipProject } from '@/components/sections/FlagshipProject';
import { ProjectCardMedia } from '@/components/ui/ProjectCardMedia';
import type { ProjectWithMedia } from '@/types';

interface ProjectsGridProps {
    flagshipProjects: ProjectWithMedia[];
    projects: ProjectWithMedia[];
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
    flagshipProjects,
    projects,
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <Section id="projects" className="py-24">
            <div className="text-center mb-20">
                <span className="text-accent font-semibold tracking-widest text-xs uppercase mb-4 block">
                    Portfolio
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-outfit text-textHeading">Selected Work</h2>
                <p className="text-xl text-textMuted max-w-2xl mx-auto">Production-grade systems and technical demonstrations</p>
            </div>

            {/* Flagship Project(s) */}
            {flagshipProjects.map((project) => (
                <div key={project.id} className="mb-24">
                    <FlagshipProject project={project} />
                </div>
            ))}

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                {projects.map((project) => (
                    <motion.div key={project.id} variants={cardVariants}>
                        <Link href={`/projects/${project.id}`} className="block h-full">
                            <Card className="h-full flex flex-col p-0 bg-surface/20 premium-border transition-all duration-500 group overflow-hidden">
                                {/* Media Preview */}
                                <div className="pointer-events-auto">
                                    <ProjectCardMedia
                                        videos={project.media?.videos || []}
                                        images={project.media?.images || []}
                                        thumbnail={project.media?.thumbnail || ''}
                                        title={project.title}
                                    />
                                </div>

                                {/* Card Content */}
                                <div className="flex-1 p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold text-textHeading font-outfit leading-tight group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-2">
                                            {project.githubUrl && (
                                                <span className="text-textMuted/40 hover:text-accent" onClick={(e) => e.stopPropagation()}>
                                                    <a href={project.githubUrl} target="_blank" rel="noopener">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                    </a>
                                                </span>
                                            )}
                                            {project.liveUrl && (
                                                <span className="text-textMuted/40 hover:text-accent" onClick={(e) => e.stopPropagation()}>
                                                    <a href={project.liveUrl} target="_blank" rel="noopener">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                    </a>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-textMuted text-lg mb-8 font-light leading-relaxed">
                                        {project.impactStatement}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 bg-white/5 text-textMuted rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/5 group-hover:bg-accent/5 group-hover:text-accent transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};
