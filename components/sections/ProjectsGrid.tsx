'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { FlagshipProject } from '@/components/sections/FlagshipProject';
import { ListProjectCard } from '@/components/projects/ListProjectCard';
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
            transition: { staggerChildren: 0.1 },
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

    // Separation of projects safely relying on the flagship flag
    const allProjects = [...flagshipProjects, ...projects];
    const remainingProjects = projects; // from the props, these are non-flagship

    return (
        <Section id="projects" className="py-16 sm:py-20 md:py-24">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4">
                <span className="text-accent font-semibold tracking-widest text-xs uppercase mb-4 block">
                    Portfolio
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-outfit text-textHeading">
                    Key Projects
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-textMuted max-w-2xl mx-auto">
                    Production-grade systems and technical demonstrations
                </p>
            </div>

            {/* Zone 1 — Flagship Project(s) rendered exactly as originally designed */}
            {flagshipProjects.map((project) => (
                <div key={project.id} className="mb-24">
                    <FlagshipProject project={project} />
                </div>
            ))}

            {/* Zone 2 — Remaining Projects List */}
            {remainingProjects.length > 0 && (
                <motion.div
                    // grid-cols-1 for Mobile, grid-cols-2 for Tablet(md), grid-cols-1 for Desktop(lg)
                    // Desktop scroll snapping enabled via styles on lg breakpoint
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 lg:overflow-y-auto lg:h-[85vh] lg:snap-y lg:snap-proximity lg:pr-2 lg:pb-10 custom-scrollbar"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {remainingProjects.map((project) => (
                        <motion.div key={project.id} variants={cardVariants} className="lg:snap-start">
                            <ListProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </Section>
    );
};
