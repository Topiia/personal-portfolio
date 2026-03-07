'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import {
    Brain,
    Code2,
    Cpu,
    Database,
    Layout,
    Network
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
    'AI & Intelligent Systems': Brain,
    'Frontend Development': Layout,
    'Backend Development': Code2,
    'Real-Time & Distributed Systems': Network,
    'Databases': Database,
    'DevOps & Tools': Cpu,
};

export const Skills = () => {
    const { categories } = getSkills();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <Section id="skills" className="relative">
            <div className="text-center mb-16">
                <span className="text-accent font-semibold tracking-widest text-xs uppercase mb-4 block">
                    Expertise
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-outfit">Technical Arsenal</h2>
                <p className="text-xl text-textMuted max-w-2xl mx-auto">Categorized signals of my engineering capabilities</p>
            </div>

            {/* Carousel Container */}
            <div className="arsenal-slider-wrapper overflow-hidden w-full py-10">
                <div className="arsenal-slider-track">
                    {/* Double the data for seamless loop */}
                    {[...categories, ...categories].map((category, index) => {
                        const Icon = categoryIcons[category.name] || Code2;
                        // Unique key using index since we are duplicating data
                        return (
                            <div key={`${category.name}-${index}`} className="flex-none w-[280px] md:w-[400px]">
                                <Card className="h-full p-6 md:p-8 premium-border bg-surface/20 glass-effect" hoverEffect={true}>
                                    <h3 className="text-xl font-bold mb-6 text-textHeading flex items-center gap-3 font-outfit">
                                        <span className="p-2 rounded-lg bg-accent/10">
                                            <Icon className="w-5 h-5 text-accent" />
                                        </span>
                                        {category.title || category.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 rounded-md bg-white/5 text-textMuted text-sm font-medium border border-white/5"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};
