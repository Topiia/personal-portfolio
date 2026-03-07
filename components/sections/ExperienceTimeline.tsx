'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getTimeline } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import {
    Briefcase,
    GraduationCap,
    Award,
    Calendar,
    MapPin
} from 'lucide-react';

export const ExperienceTimeline = () => {
    const timeline = getTimeline();
    const certifications = ['Python Programming', 'Java Programming', 'Django', 'Machine Learning', 'Natural Language Processing (NLP)'];

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <Section id="experience" className="py-32">
            <div className="text-center mb-24">
                <span className="text-accent font-semibold tracking-widest text-xs uppercase mb-4 block">
                    Trajectory
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-outfit text-textHeading">Experience & Education</h2>
                <p className="text-xl text-textMuted max-w-2xl mx-auto font-light">The professional path and academic foundation</p>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <div className="space-y-12">
                    {timeline.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                        >
                            <Card className="relative overflow-hidden p-8 md:p-10 premium-border bg-surface/10 glass-effect group" hoverEffect={true}>
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent/10">
                                                {item.type === 'experience' ? (
                                                    <Briefcase className="w-5 h-5 text-accent" />
                                                ) : (
                                                    <GraduationCap className="w-5 h-5 text-accent" />
                                                )}
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-widest text-accent/80">
                                                {item.type === 'experience' ? 'Professional' : 'Academic'}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-bold text-textHeading font-outfit">
                                                {item.type === 'experience' ? (item as any).role : (item as any).degree}
                                            </h3>
                                            <p className="text-xl text-textMuted font-medium mt-1">
                                                {item.type === 'experience' ? (item as any).company : (item as any).institution}
                                            </p>
                                        </div>

                                        {item.type === 'experience' && (
                                            <ul className="space-y-3 pt-2">
                                                {(item as any).bulletPoints.map((point: string, i: number) => (
                                                    <li key={i} className="text-base text-textMuted font-light leading-relaxed flex items-start gap-3">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 flex-shrink-0" />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="flex flex-col md:items-end gap-3 flex-shrink-0">
                                        <div className="flex items-center gap-2 text-textMuted text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                            <Calendar className="w-4 h-4" />
                                            {item.duration}
                                        </div>
                                        {(item as any).location && (
                                            <div className="flex items-center gap-2 text-textMuted text-sm font-light">
                                                <MapPin className="w-4 h-4" />
                                                {(item as any).location}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {item.type === 'experience' && (
                                    <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/5">
                                        {(item as any).technologies.map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-accent/5 text-accent/70 rounded border border-accent/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certifications Grid */}
            <div className="mt-32 max-w-5xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px bg-white/10 flex-1" />
                    <h3 className="text-2xl font-bold font-outfit text-textHeading flex items-center gap-3">
                        <Award className="w-6 h-6 text-accent" />
                        Certifications
                    </h3>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certifications.map((cert) => (
                        <div
                            key={cert}
                            className="p-5 rounded-xl bg-surface/20 border border-white/5 hover:border-accent/30 transition-all flex items-center gap-4 group"
                        >
                            <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent transition-colors">
                                <Award className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-textMuted group-hover:text-textHeading transition-colors">
                                {cert}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
