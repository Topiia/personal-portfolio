import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    hoverEffect = true,
    glass = true,
}) => {
    return (
        <div
            className={cn(
                'rounded-card p-7 transition-all duration-500 relative',
                'before:absolute before:inset-0 before:rounded-card before:bg-gradient-to-br before:from-white/[0.05] before:to-transparent before:pointer-events-none',
                glass && 'glass-effect',
                !glass && 'bg-card border border-border/10',
                hoverEffect && 'hover:border-accent/20 hover:shadow-2xl hover:shadow-glow hover:-translate-y-1 hover:scale-[1.01]',
                className
            )}
        >
            {children}
        </div>
    );
};
