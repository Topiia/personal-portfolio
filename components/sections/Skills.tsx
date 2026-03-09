'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { getSkills } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import {
    Brain,
    Code2,
    Cpu,
    Database,
    Layout,
    Network,
    ChevronLeft,
    ChevronRight
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
    const [mounted, setMounted] = useState(false);

    const autoplay = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        mounted ? { loop: true, align: 'center', dragFree: true, skipSnaps: false } : undefined,
        mounted ? [autoplay.current] : []
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => { setMounted(true); }, []);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
            else if (e.key === 'ArrowRight') emblaApi?.scrollNext();
        },
        [emblaApi]
    );

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

            {/* Skeleton before mount */}
            {!mounted ? (
                <div className="overflow-hidden w-full py-10 opacity-50">
                    <div className="flex justify-center gap-6">
                        {categories.slice(0, 3).map(c => (
                            <div key={c.name} className="flex-none w-[280px] md:w-[400px] h-[300px] rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
                        ))}
                    </div>
                </div>
            ) : (
                <div 
                    className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl w-full py-10"
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    aria-label="Technical Arsenal Carousel"
                >
                    {/* Fade masks */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-20 bg-gradient-to-r from-background to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-20 bg-gradient-to-l from-background to-transparent" />

                    <div ref={emblaRef} className="overflow-hidden py-8">
                        <div className="flex items-center will-change-transform">
                            {categories.map((category, index) => {
                                const total = categories.length;
                                const isActive = index === selectedIndex;
                                const isPrev = index === (selectedIndex - 1 + total) % total;
                                const isNext = index === (selectedIndex + 1) % total;
                                
                                let rotateStyle: React.CSSProperties;
                                let opacityClass: string;

                                if (isActive) {
                                    rotateStyle = { transform: 'scale(1) rotateY(0deg)' };
                                    opacityClass = 'opacity-100 z-10';
                                } else if (isPrev) {
                                    rotateStyle = { transform: 'scale(0.88) rotateY(6deg)' };
                                    opacityClass = 'opacity-65 z-0';
                                } else if (isNext) {
                                    rotateStyle = { transform: 'scale(0.88) rotateY(-6deg)' };
                                    opacityClass = 'opacity-65 z-0';
                                } else {
                                    rotateStyle = { transform: 'scale(0.85) rotateY(0deg)' };
                                    opacityClass = 'opacity-40 z-0';
                                }

                                const Icon = categoryIcons[category.name] || Code2;
                                
                                return (
                                    <div 
                                        key={category.name} 
                                        className={`flex-none w-[280px] md:w-[400px] px-4 transition-all duration-500 ease-out ${opacityClass}`}
                                        style={{ perspective: '1200px' }}
                                    >
                                        <div 
                                            style={{ ...rotateStyle, transformStyle: 'preserve-3d' }} 
                                            className="transition-transform duration-500 will-change-transform h-full"
                                        >
                                            <Card className="h-full p-6 md:p-8 premium-border bg-surface/20 glass-effect" hoverEffect={false}>
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
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <button
                        onClick={scrollPrev}
                        aria-label="Previous category"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-surface/90 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all shadow-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                        <ChevronLeft className="w-5 h-5 text-textMuted group-hover:text-white" />
                    </button>
                    <button
                        onClick={scrollNext}
                        aria-label="Next category"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-surface/90 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all shadow-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                        <ChevronRight className="w-5 h-5 text-textMuted group-hover:text-white" />
                    </button>
                </div>
            )}
        </Section>
    );
};
