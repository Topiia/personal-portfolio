'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getServices } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import {
    Cpu,
    Globe,
    Layers,
    Zap
} from 'lucide-react';

const serviceIcons: Record<string, any> = {
    'ai-systems': Zap,
    'full-stack': Globe,
    'distributed': Cpu,
    'consulting': Layers,
};

export const Services = () => {
    const { services } = getServices();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <Section id="services" className="relative py-32">
            <div className="text-center mb-20">
                <span className="text-accent font-semibold tracking-widest text-xs uppercase mb-4 block">
                    Capabilities
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-outfit text-textHeading">Solutions & Services</h2>
                <p className="text-xl text-textMuted max-w-2xl mx-auto">High-performance engineering for modern technical challenges</p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                {services.slice(0, 4).map((service) => {
                    const Icon = serviceIcons[service.id] || Zap;
                    return (
                        <motion.div key={service.id} variants={cardVariants}>
                            <Card className="h-full p-10 premium-border bg-surface/30 glass-effect group" hoverEffect={true}>
                                <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center mb-8 border border-accent/10 group-hover:bg-accent/10 transition-colors">
                                    <Icon className="w-7 h-7 text-accent" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-textHeading font-outfit">{service.title}</h3>
                                <p className="text-textMuted mb-8 leading-relaxed text-lg">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.features.map((feature) => (
                                        <span key={feature} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-textMuted border border-white/5">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </motion.div>
        </Section>
    );
};
