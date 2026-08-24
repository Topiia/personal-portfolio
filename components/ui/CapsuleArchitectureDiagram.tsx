'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

/* ─────────────────────────────────────────────────────────────
   Editorial node — INK/PAPER base, ACID highlights
───────────────────────────────────────────────────────────── */
interface NodeProps {
    title: string;
    type?: 'primary' | 'secondary' | 'micro' | 'acid';
    delay?: number;
    className?: string;
}

const Node: React.FC<NodeProps> = ({ title, type = 'secondary', delay = 0, className }) => {
    const styles: Record<string, string> = {
        primary:   'border-[rgba(21,21,21,0.25)] text-ink text-[0.8125rem] font-semibold px-5 py-2.5 min-w-[160px]',
        secondary: 'border-[rgba(21,21,21,0.12)] text-[rgba(21,21,21,0.60)] text-[0.75rem] px-4 py-2 min-w-[130px] hover:border-[rgba(21,21,21,0.28)] hover:text-ink',
        micro:     'border-[rgba(21,21,21,0.08)] text-[rgba(21,21,21,0.40)] text-[0.6875rem] px-3 py-1.5 min-w-[100px]',
        acid:      'border-[rgba(200,255,56,0.40)] text-acid text-[0.75rem] px-4 py-2 min-w-[130px] bg-[rgba(200,255,56,0.04)]',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay, duration: 0.4 }}
            className={`flex items-center justify-center text-center border rounded-[6px] transition-colors z-10 relative ${styles[type]} ${className ?? ''}`}
        >
            {title}
        </motion.div>
    );
};

/* ─────────────────────────────────────────────────────────────
   Connectors
───────────────────────────────────────────────────────────── */
const VLine = ({ dashed = false, className = '' }: { dashed?: boolean; className?: string }) => (
    <div className={`w-px h-8 ${dashed ? 'border-l border-dashed border-[rgba(21,21,21,0.12)]' : 'border-l border-[rgba(21,21,21,0.18)]'} ${className}`} />
);

const ArrowDown = () => (
    <div className="w-1.5 h-1.5 border-b border-r border-[rgba(21,21,21,0.22)] rotate-45 -mt-1 mx-auto" aria-hidden="true" />
);

/* ─────────────────────────────────────────────────────────────
   Label
───────────────────────────────────────────────────────────── */
const GroupLabel = ({ children }: { children: React.ReactNode }) => (
    <span className="absolute -top-2.5 left-3 text-[0.5625rem] font-semibold tracking-[0.14em] uppercase text-[rgba(21,21,21,0.28)] bg-paper px-1.5">
        {children}
    </span>
);

/* ─────────────────────────────────────────────────────────────
   Diagram
───────────────────────────────────────────────────────────── */
const DiagramContent = () => (
    <div className="min-w-[800px] flex flex-col items-center font-sans relative py-8 px-10">

                {/* 1. CLIENT */}
                <Node title="Client (React SPA)" type="primary" delay={0.05} />

                <div className="flex flex-col items-center">
                    <VLine />
                    <ArrowDown />
                </div>

                {/* 2. EDGE SECURITY */}
                <div className="relative flex flex-col items-center gap-0 p-4 rounded-[8px] border border-[rgba(21,21,21,0.08)] bg-[rgba(21,21,21,0.02)] w-[420px]">
                    <GroupLabel>Edge Security Middleware</GroupLabel>
                    <Node title="CORS Policy" type="micro" delay={0.1} />
                    <VLine className="h-5" />
                    <Node title="Helmet Security Headers" type="micro" delay={0.1} />
                    <VLine className="h-5" />
                    <Node title="Rate Limiter" type="micro" delay={0.1} />
                    <VLine className="h-5" />
                    <Node title="Auth Middleware (JWT Cookie)" type="acid" delay={0.15} />
                </div>

                <div className="flex flex-col items-center">
                    <VLine />
                    <ArrowDown />
                </div>

                {/* 3. ROUTER */}
                <Node title="Express Router" type="primary" delay={0.2} />

                <div className="flex flex-col items-center">
                    <VLine className="h-10" />
                    {/* Fork */}
                    <div className="w-[580px] border-t border-[rgba(21,21,21,0.18)] h-px -mb-0" />
                    <div className="flex justify-between w-[580px]">
                        <VLine className="h-6" />
                        <VLine className="h-6" />
                        <VLine className="h-6" />
                        <VLine className="h-6" />
                    </div>
                </div>

                {/* 4. CONTROLLERS */}
                <div className="relative flex justify-between w-[640px] mb-10 mt-0">
                    <GroupLabel>Controller Layer</GroupLabel>
                    <Node title="Auth Controller" type="secondary" delay={0.25} />
                    <Node title="Video Controller" type="secondary" delay={0.25} />
                    <Node title="Comment Controller" type="secondary" delay={0.25} />
                    <Node title="User Controller" type="secondary" delay={0.25} />
                </div>

                {/* Drops to services */}
                <div className="flex justify-between w-[580px] -mt-8 mb-1">
                    <VLine className="h-8" />
                    <VLine className="h-8" />
                    <VLine className="h-8" />
                    <VLine className="h-8" />
                </div>

                {/* 5. SERVICES */}
                <div className="relative flex justify-between w-[640px] mb-12 p-3 rounded-[8px] border border-[rgba(21,21,21,0.08)] bg-[rgba(21,21,21,0.02)]">
                    <GroupLabel>Service Layer</GroupLabel>
                    <Node title="Auth Service" type="secondary" delay={0.3} />
                    <div className="relative">
                        <Node title="Video Service" type="secondary" delay={0.3} className="border-[rgba(200,255,56,0.20)]" />
                        {/* Branch to async */}
                        <div className="absolute top-1/2 left-full flex items-center w-20">
                            <div className="w-full border-t border-dashed border-[rgba(21,21,21,0.14)]" />
                            <div className="w-1.5 h-1.5 border-t border-r border-[rgba(21,21,21,0.18)] rotate-45 -ml-1" />
                        </div>
                    </div>
                    <Node title="Comment Service" type="secondary" delay={0.3} />
                    <Node title="User Service" type="secondary" delay={0.3} />
                </div>

                {/* DATA + ASYNC SPLIT */}
                <div className="flex w-full max-w-[860px] justify-between items-start relative px-4">

                    {/* 6. DATA LAYER */}
                    <div className="flex flex-col gap-3 w-[240px]">
                        <div className="relative p-4 rounded-[8px] border border-[rgba(21,21,21,0.08)] bg-[rgba(21,21,21,0.02)]">
                            <GroupLabel>Data Layer</GroupLabel>
                            <div className="flex flex-col items-start gap-4 mt-2">
                                <Node title="MongoDB Database" type="primary" delay={0.35} className="w-full" />
                                <Node title="Redis Cache" type="primary" delay={0.35} className="w-full" />
                                <div className="pl-3 border-l border-dashed border-[rgba(21,21,21,0.10)] flex flex-col gap-1.5 w-full">
                                    <Node title="Feed Cache" type="micro" delay={0.4} className="w-full" />
                                    <Node title="Session Store" type="micro" delay={0.4} className="w-full" />
                                    <Node title="Rate Limit Store" type="micro" delay={0.4} className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7. ASYNC QUEUE */}
                    <div className="flex flex-col items-center w-[280px] ml-10 relative">
                        <div className="absolute -top-12 left-1/2 w-px h-12 border-l border-dashed border-[rgba(21,21,21,0.12)]" aria-hidden="true" />
                        <div className="relative p-4 rounded-[8px] border border-[rgba(21,21,21,0.08)] bg-[rgba(21,21,21,0.02)] w-full flex flex-col items-center">
                            <GroupLabel>Async Queue System</GroupLabel>
                            <Node title="Bull Queue Manager" type="acid" delay={0.4} className="w-full mb-4 mt-2" />
                            <div className="flex flex-col gap-3 w-full">
                                <Node title="Email Worker" type="secondary" delay={0.45} className="w-full" />
                                <div className="relative w-full">
                                    <Node title="AI Moderation Worker" type="secondary" delay={0.45} className="w-full border-[rgba(200,255,56,0.20)]" />
                                    {/* AI subsystem */}
                                    <div className="mt-2 ml-3 pl-3 border-l border-dashed border-[rgba(200,255,56,0.20)] flex flex-col gap-1.5">
                                        <Node title="Groq LLM API" type="acid" delay={0.5} className="text-left justify-start" />
                                        <Node title="HuggingFace NLP" type="acid" delay={0.5} className="text-left justify-start" />
                                        <Node title="Trust Score" type="acid" delay={0.5} className="text-left justify-start" />
                                    </div>
                                </div>
                                <Node title="Cleanup Worker" type="secondary" delay={0.45} className="w-full" />
                                <Node title="Dead-Letter Queue" type="secondary" delay={0.45} className="w-full border-[rgba(255,107,87,0.30)] text-[rgba(255,107,87,0.65)]" />
                            </div>
                        </div>
                    </div>

                    {/* 8. OBSERVABILITY */}
                    <div className="flex flex-col gap-2 w-[160px] pt-8">
                        <div className="relative p-4 rounded-[8px] border border-[rgba(21,21,21,0.08)] bg-[rgba(21,21,21,0.02)]">
                            <GroupLabel>Observability</GroupLabel>
                            <div className="flex flex-col gap-1.5 mt-2">
                                <Node title="Prometheus" type="micro" delay={0.55} className="w-full" />
                                <Node title="Sentry" type="micro" delay={0.55} className="w-full" />
                                <Node title="Winston Logs" type="micro" delay={0.55} className="w-full" />
                                <Node title="Correlation ID" type="micro" delay={0.55} className="w-full" />
                            </div>
                        </div>
                    </div>
        </div>
    </div>
);

export const CapsuleArchitectureDiagram: React.FC = () => {
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);

    return (
        <>
            {/* Desktop View — Inline Diagram */}
            <div className="hidden md:block rounded-[12px] border border-[rgba(21,21,21,0.08)] bg-[rgba(21,21,21,0.02)] overflow-x-auto">
                <DiagramContent />
            </div>

            {/* Mobile View — Preview Card */}
            <div className="md:hidden rounded-[12px] border border-[rgba(21,21,21,0.08)] bg-[rgba(21,21,21,0.02)] p-5">
                <h4 className="text-[0.9375rem] font-bold tracking-[-0.02em] text-ink mb-1">Architecture</h4>
                <p className="text-[0.8125rem] text-[rgba(21,21,21,0.60)] leading-relaxed mb-5">
                    Distributed Node.js backend with AI moderation workers, async queues, and comprehensive observability.
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
                            <span className="text-[0.8125rem] font-bold text-ink tracking-[0.05em] uppercase">Capsule Architecture</span>
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
                            <TransformWrapper initialScale={0.4} minScale={0.3} maxScale={3} centerOnInit>
                                <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                                    <DiagramContent />
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
