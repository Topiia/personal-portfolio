'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getFlagshipProjects } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const FeaturedProject = () => {
    const flagships = getFlagshipProjects();
    const project = flagships[0];
    if (!project) return null;
    return (
        <Section id="featured-project" className="relative overflow-hidden py-32">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="container mx-auto"
            >
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left Side: Impact & Signal */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <span className="text-accent font-semibold tracking-widest text-xs uppercase mb-4 block">
                                Flagship Project
                            </span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-textHeading font-outfit">
                                {project.title.split(' - ')[0]}
                            </h2>
                            <p className="text-xl md:text-2xl text-textMuted font-light leading-relaxed mb-8">
                                {project.impactStatement}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {project.techStack.slice(0, 5).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-lg bg-surface/50 border border-border/10 text-textHeading text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.techStack.length > 5 && (
                                <span className="px-4 py-2 text-textMuted text-sm self-center">
                                    +{project.techStack.length - 5} more
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button href={`/projects/${project.id}`} variant="primary" size="lg" className="rounded-full">
                                View Case Study
                            </Button>
                            {project.githubUrl && (
                                <Button href={project.githubUrl} variant="outline" size="lg" className="rounded-full">
                                    Source Code
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Technical Visual Signal */}
                    <div className="flex-1 w-full max-w-2xl">
                        <Card className="relative p-1 aspect-video rounded-2xl overflow-hidden group border-white/5" glass={true}>
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="bg-background/80 w-full h-full rounded-[14px] overflow-hidden flex flex-col">
                                <div className="h-8 bg-surface/80 flex items-center px-4 gap-1.5 border-b border-white/5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                    <div className="ml-4 text-[10px] text-textMuted font-mono">distributed-orchestrator-main.py</div>
                                </div>
                                <div className="p-6 font-mono text-xs md:text-sm text-accent/80 space-y-2">
                                    <div className="flex gap-4"><span className="text-textMuted/30">01</span><span>import distributed_engine as de</span></div>
                                    <div className="flex gap-4"><span className="text-textMuted/30">02</span><span>engine = de.Core(env=&quot;prod&quot;)</span></div>
                                    <div className="flex gap-4"><span className="text-textMuted/30">03</span><span className="text-textHeading">engine.scale_on_demand(threshold=0.85)</span></div>
                                    <div className="flex gap-4"><span className="text-textMuted/30">04</span><span># Real-time monitoring enabled</span></div>
                                    <div className="flex gap-4"><span className="text-textMuted/30">05</span><span className="text-green-400/70">✓ Connected to message_broker:6379</span></div>
                                    <div className="flex gap-4"><span className="text-textMuted/30">06</span><span className="text-green-400/70">✓ WebSocket stream initialized (10.0.0.1:443)</span></div>
                                    <div className="flex gap-4"><span className="text-textMuted/30">07</span><span className="animate-pulse text-accent">_</span></div>
                                </div>
                                <div className="mt-auto p-4 border-t border-white/5 bg-surface/30 flex justify-between items-center text-[10px] text-textMuted font-mono uppercase tracking-widest">
                                    <span>Status: Operational</span>
                                    <span>Load: 12%</span>
                                    <span>Nodes: 04</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </motion.div>
        </Section>
    );
};
