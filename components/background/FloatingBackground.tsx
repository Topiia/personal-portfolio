'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Code2,
    Cpu,
    Database,
    Globe,
    Layers,
    Network,
    Server,
    Shield,
    Terminal,
    Zap,
    Brain,
    Workflow,
    Cloud,
    Container,
    GitBranch
} from 'lucide-react';

const techLogos = [
    { Icon: Code2, size: 72, x: 10, y: 15, duration: 35, rotation: 3, opacity: 0.18, glow: true },
    { Icon: Cpu, size: 48, x: 85, y: 10, duration: 42, rotation: -4, opacity: 0.16, hideOnMobile: true },
    { Icon: Database, size: 64, x: 20, y: 75, duration: 38, rotation: 5, opacity: 0.20, glow: true },
    { Icon: Globe, size: 56, x: 75, y: 70, duration: 40, rotation: -3, opacity: 0.17 },
    { Icon: Layers, size: 52, x: 50, y: 25, duration: 33, rotation: 4, opacity: 0.15, hideOnMobile: true },
    { Icon: Network, size: 80, x: 30, y: 45, duration: 45, rotation: -5, opacity: 0.22, glow: true },
    { Icon: Server, size: 60, x: 65, y: 40, duration: 36, rotation: 3, opacity: 0.19 },
    { Icon: Shield, size: 44, x: 15, y: 55, duration: 39, rotation: -4, opacity: 0.14, hideOnMobile: true },
    { Icon: Terminal, size: 68, x: 90, y: 50, duration: 41, rotation: 6, opacity: 0.21, glow: true },
    { Icon: Zap, size: 50, x: 40, y: 80, duration: 34, rotation: -2, opacity: 0.16, hideOnMobile: true },
    { Icon: Brain, size: 76, x: 60, y: 15, duration: 43, rotation: 4, opacity: 0.20, glow: true },
    { Icon: Workflow, size: 54, x: 12, y: 35, duration: 37, rotation: -3, opacity: 0.17 },
    { Icon: Cloud, size: 62, x: 80, y: 82, duration: 40, rotation: 5, opacity: 0.18, hideOnMobile: true },
    { Icon: Container, size: 58, x: 45, y: 60, duration: 38, rotation: -4, opacity: 0.19 },
    { Icon: GitBranch, size: 46, x: 25, y: 0, duration: 36, rotation: 3, opacity: 0.15, hideOnMobile: true }
];

export const FloatingBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
            {/* Gradient vignette for center readability */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />

            {/* Floating tech logos */}
            <div className="absolute inset-0">
                {techLogos.map((logo, index) => {
                    const { Icon, size, x, y, duration, rotation, opacity, glow, hideOnMobile } = logo;

                    return (
                        <motion.div
                            key={index}
                            className={`absolute text-textMuted ${glow ? 'drop-shadow-[0_0_8px_var(--color-accent)]' : ''} ${hideOnMobile ? 'hidden md:block' : ''}`}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                opacity: opacity,
                                filter: 'blur(0.5px)',
                            }}
                            initial={{
                                x: 0,
                                y: 0,
                                rotate: 0,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, rotation, -rotation, 0],
                                opacity: [opacity, opacity * 1.2, opacity],
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.5,
                            }}
                        >
                            <Icon size={size} strokeWidth={1.2} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Layered background depth system */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {/* Layer 2: Radial gradient glows */}
                <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-accent/8 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[15%] right-[10%] w-[600px] h-[600px] rounded-full bg-primary/6 blur-[120px]" />
                <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[90px]" />
            </div>

            {/* Subtle grain texture */}
            <div
                className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
