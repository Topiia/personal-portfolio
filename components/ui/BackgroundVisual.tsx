'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BackgroundVisualProps {
    src: string;
    alt?: string;
    theme?: 'light' | 'dark'; // 'paper' vs 'ink'
    imageType?: 'atmospheric' | 'technical';
    contentAlignment?: 'left' | 'right' | 'center';
    focalPosition?: string; // e.g., 'object-center', 'object-right-top'
    priority?: boolean;
    topBlend?: boolean;
    bottomBlend?: boolean;
    className?: string;
}

export const BackgroundVisual: React.FC<BackgroundVisualProps> = ({
    src,
    alt = '',
    theme = 'dark',
    imageType = 'atmospheric',
    contentAlignment = 'left',
    focalPosition = 'object-center',
    priority = false,
    topBlend = false,
    bottomBlend = false,
    className = '',
}) => {
    // 1. Base Softening Overlay
    // Atmospheric images get a stronger base fade so they don't overpower text anywhere.
    // Technical images remain clear.
    let baseOverlay = '';
    if (imageType === 'atmospheric') {
        baseOverlay = theme === 'dark' ? 'bg-ink/40' : 'bg-paper/40';
    } else {
        baseOverlay = theme === 'dark' ? 'bg-ink/10' : 'bg-paper/10';
    }

    // 2. Directional Gradient (Text Safe-Zone)
    let gradientClass = '';

    if (theme === 'dark') {
        if (contentAlignment === 'left') {
            // Mobile: solid top, transparent bottom. Desktop: solid left, transparent right.
            gradientClass = 'bg-gradient-to-b from-ink via-ink/90 to-transparent lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/75 lg:to-transparent lg:to-[85%]';
        } else if (contentAlignment === 'right') {
            gradientClass = 'bg-gradient-to-b from-ink via-ink/90 to-transparent lg:bg-gradient-to-l lg:from-ink/95 lg:via-ink/75 lg:to-transparent lg:to-[85%]';
        } else {
            gradientClass = 'bg-gradient-to-b from-ink/90 via-ink/70 to-ink/90';
        }
    } else {
        if (contentAlignment === 'left') {
            // For light mode (paper), we need strong contrast for dark text.
            gradientClass = 'bg-gradient-to-b from-paper via-paper/95 via-[60%] to-transparent lg:bg-gradient-to-r lg:from-paper lg:from-[45%] lg:via-paper/85 lg:via-[70%] lg:to-transparent lg:to-[90%]';
        } else if (contentAlignment === 'right') {
            gradientClass = 'bg-gradient-to-b from-paper via-paper/95 via-[60%] to-transparent lg:bg-gradient-to-l lg:from-paper lg:from-[45%] lg:via-paper/85 lg:via-[70%] lg:to-transparent lg:to-[90%]';
        } else {
            gradientClass = 'bg-gradient-to-b from-paper/90 via-paper/70 to-paper/90';
        }
    }

    return (
        <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
            {/* The Image layer with subtle entrance scale if atmospheric */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                initial={imageType === 'atmospheric' ? { scale: 1.05 } : { scale: 1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-80px' }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="100vw"
                    className={`object-cover ${focalPosition}`}
                    priority={priority}
                    loading={priority ? undefined : 'lazy'}
                />
            </motion.div>

            {/* Readability Overlays */}
            
            {/* Base soft layer */}
            {baseOverlay && (
                <div className={`absolute inset-0 ${baseOverlay}`} />
            )}

            {/* Directional text safe-zone */}
            <div className={`absolute inset-0 ${gradientClass}`} />

            {/* Optional vertical blends for seamless section transitions */}
            {topBlend && theme === 'dark' && (
                <div className="absolute inset-x-0 top-0 h-[clamp(4rem,10dvh,8rem)] bg-gradient-to-b from-ink to-transparent" />
            )}
            {bottomBlend && theme === 'dark' && (
                <div className="absolute inset-x-0 bottom-0 h-[clamp(4rem,10dvh,8rem)] bg-gradient-to-t from-ink to-transparent" />
            )}
        </div>
    );
};
