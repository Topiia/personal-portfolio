import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    target?: string;
    rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    href,
    onClick,
    type = 'button',
    target,
    rel,
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-gradient-to-r from-accent to-primary text-[var(--color-button-text)] shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-105',
        secondary: 'bg-surface/30 backdrop-blur-md text-textPrimary border border-border/20 hover:border-accent/40 hover:bg-surface/50 hover:shadow-lg hover:shadow-glow hover:scale-105',
        ghost: 'text-textMuted hover:text-textPrimary hover:bg-surface/20 hover:scale-105',
        outline: 'border border-border/20 text-textPrimary backdrop-blur-sm hover:bg-accent/10 hover:border-accent/40 hover:shadow-md hover:scale-105',
    };

    const sizes = {
        sm: 'px-5 py-2 text-xs font-medium tracking-wide',
        md: 'px-8 py-3.5 text-sm font-semibold tracking-wide',
        lg: 'px-12 py-4 text-base font-semibold tracking-wide',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
        return (
            <Link href={href} className={classes} target={target} rel={rel}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={classes}>
            {children}
        </button>
    );
};
