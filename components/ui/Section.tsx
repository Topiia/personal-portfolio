import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
    children,
    id,
    className,
    containerClassName,
}) => {
    return (
        <section id={id} className={cn('py-section', className)}>
            <div className={cn('container mx-auto px-6 max-w-[1280px]', containerClassName)}>
                {children}
            </div>
        </section>
    );
};
