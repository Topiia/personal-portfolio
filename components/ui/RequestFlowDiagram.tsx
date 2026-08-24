'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface RequestFlowDiagramProps {
    steps: string[];
}

const DiagramContent: React.FC<{ steps: string[] }> = ({ steps }) => (
    <div className="bg-surface/30 p-8 border border-border flex flex-col items-center min-w-[300px]">
        {steps.map((step, index) => (
            <React.Fragment key={index}>
                {/* Node Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="w-full max-w-md bg-surface border border-accent/20 rounded-xl py-4 px-6 text-center shadow-lg relative z-10 hover:border-accent/60 transition-colors"
                >
                    <span className="text-textHeading font-semibold tracking-wide text-sm md:text-base">
                        {step}
                    </span>
                </motion.div>

                {/* Connecting Arrow */}
                {index < steps.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                        className="h-10 w-px bg-accent/40 relative my-0.5 z-0"
                    >
                        {/* Arrow Head */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 origin-center w-2.5 h-2.5 border-b-2 border-r-2 border-accent/40 rotate-45" />
                    </motion.div>
                )}
            </React.Fragment>
        ))}
    </div>
);

export const RequestFlowDiagram: React.FC<RequestFlowDiagramProps> = ({ steps }) => {
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);

    if (!steps || steps.length === 0) return null;

    return (
        <>
            {/* Desktop View — Inline Diagram */}
            <div className="hidden md:block rounded-xl overflow-hidden">
                <DiagramContent steps={steps} />
            </div>

            {/* Mobile View — Preview Card */}
            <div className="md:hidden rounded-[12px] border border-[rgba(21,21,21,0.08)] bg-[rgba(21,21,21,0.02)] p-5">
                <h4 className="text-[0.9375rem] font-bold tracking-[-0.02em] text-ink mb-1">Request Flow</h4>
                <p className="text-[0.8125rem] text-[rgba(21,21,21,0.60)] leading-relaxed mb-5">
                    View the step-by-step request flow architecture diagram.
                </p>
                <button
                    onClick={() => setIsMobileExpanded(true)}
                    className="w-full py-3 rounded-[8px] bg-[rgba(21,21,21,0.06)] border border-[rgba(21,21,21,0.12)] text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ink hover:bg-[rgba(21,21,21,0.10)] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    VIEW SYSTEM
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 12V8M2 12H6M2 12L6 8M12 2v4M12 2H8M12 2L8 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Mobile Zoom Modal */}
            <AnimatePresence>
                {isMobileExpanded && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-paper flex flex-col md:hidden"
                        initial={{ opacity: 0, y: '10%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '10%' }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-[rgba(21,21,21,0.08)]">
                            <span className="text-[0.8125rem] font-bold text-ink tracking-[0.05em] uppercase">Request Flow</span>
                            <button
                                onClick={() => setIsMobileExpanded(false)}
                                className="p-2 text-[rgba(21,21,21,0.60)] hover:text-ink"
                                aria-label="Close viewer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden bg-[rgba(21,21,21,0.02)]">
                            <TransformWrapper initialScale={0.8} minScale={0.3} maxScale={3} centerOnInit>
                                <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                                    <DiagramContent steps={steps} />
                                </TransformComponent>
                            </TransformWrapper>
                        </div>
                        <div className="p-4 border-t border-[rgba(21,21,21,0.08)] text-center">
                            <p className="text-micro text-[rgba(21,21,21,0.50)]">Pinch to zoom, drag to pan</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
