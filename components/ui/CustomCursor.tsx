'use client';

import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true);

    // Position state
    const mouse = useRef({ x: 0, y: 0 });
    const cursor = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);
    const isVisible = useRef(false);

    // State tracking to avoid redundant DOM writes
    const currentScale = useRef(1);
    const currentOpacity = useRef(0.9);
    const currentBorder = useRef('');
    const currentBg = useRef('var(--color-accent)');

    // Initialize and handle resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();

        const handleResize = () => {
            checkMobile();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mouse movement and hover logic
    useEffect(() => {
        if (isMobile) return;

        const onMouseMove = (e: MouseEvent) => {
            // First movement makes cursor visible
            if (!isVisible.current && cursorRef.current) {
                isVisible.current = true;
                cursorRef.current.style.opacity = '1';
                cursor.current = { x: e.clientX, y: e.clientY };
            }

            mouse.current = { x: e.clientX, y: e.clientY };

            // Context-aware logic
            const target = e.target as HTMLElement;

            // Determine state
            let scale = 1;
            let opacity = 0.9;
            let border = 'none';
            let bg = 'var(--color-accent)';

            // Check for pointer (Link/Button)
            const isPointer = target.closest('a, button, [role="button"], [onclick]');

            // Check for text
            const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span, li');

            // Check for input
            const isInput = target.closest('input, textarea, select');

            if (isInput) {
                scale = 1.3;
                opacity = 1;
                bg = 'transparent';
                border = '1.5px solid var(--color-accent)';
            } else if (isPointer) {
                scale = 1.8;
                opacity = 1;
            } else if (isText) {
                // Only if not a pointer (e.g. text inside a button)
                if (!isPointer) {
                    scale = 0.7;
                    opacity = 1;
                }
            }

            // Apply styles if changed (Direct DOM manipulation)
            if (dotRef.current) {
                // We use a small threshold or direct comparison since these are discrete states
                // But to be safe against float issues, strict equality for discrete states is fine
                // However, we only write to DOM if changed to verify 'No React state updates' rule compliance
                // AND to minimize layout thrashing if we were reading. But we are just writing.
                // Actually, writing every frame is fine if values are same? No, optimized is better.
                // But we are in 'mousemove', not RAF. 
                // Wait, putting this in mousemove means it runs every mouse event. 
                // This is fine for responsiveness.

                // Using CSS variables or classes might be cleaner, but direct style is requested for performance rules?
                // "No React state updates" is key.

                // Let's just write to the style. The browser optimizes redundant style sets often.
                // But let's check our refs to be sure.

                if (currentScale.current !== scale ||
                    currentOpacity.current !== opacity ||
                    currentBorder.current !== border ||
                    currentBg.current !== bg) {

                    dotRef.current.style.transform = `scale(${scale})`;
                    dotRef.current.style.opacity = `${opacity}`;
                    dotRef.current.style.border = border;
                    dotRef.current.style.backgroundColor = bg;

                    currentScale.current = scale;
                    currentOpacity.current = opacity;
                    currentBorder.current = border;
                    currentBg.current = bg;
                }
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        // Animation loop
        const animate = () => {
            if (!cursorRef.current) return;

            // Smooth interpolation (lerp)
            const ease = 0.15;
            cursor.current.x += (mouse.current.x - cursor.current.x) * ease;
            cursor.current.y += (mouse.current.y - cursor.current.y) * ease;

            // Apply transform
            cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;

            rafId.current = requestAnimationFrame(animate);
        };

        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[2147483647] pointer-events-none"
            style={{
                willChange: 'transform',
                opacity: 0, // Start hidden
                transform: 'translate3d(-100px, -100px, 0)'
            }}
        >
            <div
                ref={dotRef}
                className="w-2 h-2 rounded-full transition-all duration-150 ease-out"
                style={{
                    backgroundColor: 'var(--color-accent)',
                    transform: 'scale(1)',
                    opacity: 0.9
                }}
            />
        </div>
    );
};
