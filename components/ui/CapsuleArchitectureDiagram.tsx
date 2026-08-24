'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

/* ─────────────────────────────────────────────────────────────
   Editorial node — INK/PAPER base, ACID highlights
───────────────────────────────────────────────────────────── */
interface NodeProps {
    title: string;
    type?: 'primary' | 'secondary' | 'micro' | 'acid' | 'warning';
    delay?: number;
    className?: string;
}

const Node: React.FC<NodeProps> = ({ title, type = 'secondary', delay = 0, className }) => {
    const styles: Record<string, string> = {
        primary:   'border border-[rgba(21,21,21,0.15)] rounded-[4px] text-ink text-[0.8125rem] font-semibold px-5 py-2.5 min-w-[160px] bg-transparent',
        secondary: 'text-[rgba(21,21,21,0.65)] text-[0.75rem] font-medium px-4 py-2 min-w-[130px] transition-colors hover:text-ink',
        micro:     'text-[rgba(21,21,21,0.45)] text-[0.6875rem] px-3 py-1.5 min-w-[100px] uppercase tracking-wider font-semibold',
        acid:      'border-l-2 border-acid text-ink text-[0.75rem] font-semibold px-4 py-2 min-w-[130px] bg-[rgba(200,255,56,0.08)]',
        warning:   'border-l-2 border-coral text-coral text-[0.75rem] font-medium px-4 py-2 min-w-[130px] bg-[rgba(255,107,87,0.05)]',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay, duration: 0.4 }}
            className={`flex items-center justify-center text-center z-10 relative ${styles[type]} ${className ?? ''}`}
        >
            {title}
        </motion.div>
    );
};

/* ─────────────────────────────────────────────────────────────
   Connectors
───────────────────────────────────────────────────────────── */
const VLine = ({ dashed = false, className = '' }: { dashed?: boolean; className?: string }) => (
    <div className={`w-px h-8 ${dashed ? 'border-l border-dashed border-[rgba(21,21,21,0.15)]' : 'border-l border-[rgba(21,21,21,0.15)]'} ${className}`} />
);

const ArrowDown = () => (
    <div className="w-1.5 h-1.5 border-b border-r border-[rgba(21,21,21,0.22)] rotate-45 -mt-1 mx-auto" aria-hidden="true" />
);

/* ─────────────────────────────────────────────────────────────
   Label
───────────────────────────────────────────────────────────── */
const GroupLabel = ({ children, align = 'center' }: { children: React.ReactNode, align?: 'center' | 'left' }) => (
    <span className={`text-[0.625rem] font-semibold tracking-[0.14em] uppercase text-[rgba(21,21,21,0.35)] mb-4 block w-full ${align === 'left' ? 'text-left pl-4' : 'text-center'}`}>
        {children}
    </span>
);

/* ─────────────────────────────────────────────────────────────
   Diagram
───────────────────────────────────────────────────────────── */
const DiagramContent = () => (
    <div className="min-w-[800px] flex flex-col items-center font-sans relative py-12 px-10">

        {/* 1. CLIENT */}
        <Node title="Client (React SPA)" type="primary" delay={0.05} />

        <div className="flex flex-col items-center">
            <VLine />
            <ArrowDown />
        </div>

        {/* 2. EDGE SECURITY */}
        <div className="flex flex-col items-center w-[420px] mb-2">
            <GroupLabel>Edge Security Middleware</GroupLabel>
            <Node title="CORS Policy" type="micro" delay={0.1} />
            <VLine className="h-5" />
            <Node title="Helmet Security Headers" type="micro" delay={0.1} />
            <VLine className="h-5" />
            <Node title="Rate Limiter" type="micro" delay={0.1} />
            <VLine className="h-5" />
            <Node title="Auth Middleware (JWT Cookie)" type="acid" delay={0.15} className="rounded-r-[4px]" />
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
            <div className="w-[580px] border-t border-[rgba(21,21,21,0.15)] h-px" />
            <div className="flex justify-between w-[580px]">
                <VLine className="h-8" />
                <VLine className="h-8" />
                <VLine className="h-8" />
                <VLine className="h-8" />
            </div>
        </div>

        {/* 4. CONTROLLERS */}
        <div className="flex flex-col w-[640px] mb-10">
            <GroupLabel>Controller Layer</GroupLabel>
            <div className="flex justify-between w-full">
                <Node title="Auth Controller" type="secondary" delay={0.25} />
                <Node title="Video Controller" type="secondary" delay={0.25} />
                <Node title="Comment Controller" type="secondary" delay={0.25} />
                <Node title="User Controller" type="secondary" delay={0.25} />
            </div>
        </div>

        {/* Drops to services */}
        <div className="flex justify-between w-[580px] -mt-6 mb-2">
            <VLine className="h-10" />
            <VLine className="h-10" />
            <VLine className="h-10" />
            <VLine className="h-10" />
        </div>

        {/* 5. SERVICES */}
        <div className="flex flex-col w-[640px] mb-16">
            <GroupLabel>Service Layer</GroupLabel>
            <div className="flex justify-between w-full">
                <Node title="Auth Service" type="secondary" delay={0.3} />
                <div className="relative">
                    <Node title="Video Service" type="acid" delay={0.3} className="rounded-r-[4px]" />
                    {/* Branch to async */}
                    <div className="absolute top-1/2 left-full flex items-center w-[72px]">
                        <div className="w-full border-t border-dashed border-[rgba(21,21,21,0.15)]" />
                        <div className="w-1.5 h-1.5 border-t border-r border-[rgba(21,21,21,0.22)] rotate-45 -ml-1" />
                    </div>
                </div>
                <Node title="Comment Service" type="secondary" delay={0.3} />
                <Node title="User Service" type="secondary" delay={0.3} />
            </div>
        </div>

        {/* DATA + ASYNC SPLIT */}
        <div className="flex w-full max-w-[860px] justify-between items-start relative px-4">

            {/* 6. DATA LAYER */}
            <div className="flex flex-col gap-3 w-[240px]">
                <GroupLabel align="left">Data Layer</GroupLabel>
                <div className="flex flex-col items-start gap-4">
                    <Node title="MongoDB Database" type="primary" delay={0.35} className="w-full justify-start" />
                    <Node title="Redis Cache" type="primary" delay={0.35} className="w-full justify-start" />
                    <div className="ml-4 pl-4 border-l border-[rgba(21,21,21,0.1)] flex flex-col gap-1 w-full">
                        <Node title="Feed Cache" type="micro" delay={0.4} className="w-full justify-start px-0" />
                        <Node title="Session Store" type="micro" delay={0.4} className="w-full justify-start px-0" />
                        <Node title="Rate Limit Store" type="micro" delay={0.4} className="w-full justify-start px-0" />
                    </div>
                </div>
            </div>

            {/* 7. ASYNC QUEUE */}
            <div className="flex flex-col w-[280px] ml-10 relative">
                <div className="absolute -top-20 left-1/2 w-px h-20 border-l border-dashed border-[rgba(21,21,21,0.15)]" aria-hidden="true" />
                <GroupLabel align="left">Async Queue System</GroupLabel>
                <Node title="Bull Queue Manager" type="acid" delay={0.4} className="w-full mb-4 justify-start rounded-r-[4px]" />
                
                <div className="flex flex-col gap-2 w-full ml-4">
                    <Node title="Email Worker" type="secondary" delay={0.45} className="w-full justify-start px-0" />
                    <div className="relative w-full">
                        <Node title="AI Moderation Worker" type="secondary" delay={0.45} className="w-full justify-start px-0 font-semibold text-[rgba(21,21,21,0.85)]" />
                        {/* AI subsystem */}
                        <div className="mt-2 ml-4 pl-4 border-l border-[rgba(21,21,21,0.1)] flex flex-col gap-1.5 mb-2">
                            <Node title="Groq LLM API" type="acid" delay={0.5} className="justify-start rounded-r-[4px]" />
                            <Node title="HuggingFace NLP" type="acid" delay={0.5} className="justify-start rounded-r-[4px]" />
                            <Node title="Trust Score" type="acid" delay={0.5} className="justify-start rounded-r-[4px]" />
                        </div>
                    </div>
                    <Node title="Cleanup Worker" type="secondary" delay={0.45} className="w-full justify-start px-0" />
                    <Node title="Dead-Letter Queue" type="warning" delay={0.45} className="w-full justify-start rounded-r-[4px] mt-2" />
                </div>
            </div>

            {/* 8. OBSERVABILITY */}
            <div className="flex flex-col gap-2 w-[160px]">
                <GroupLabel align="left">Observability</GroupLabel>
                <div className="flex flex-col gap-2">
                    <Node title="Prometheus" type="micro" delay={0.55} className="w-full justify-start px-2" />
                    <Node title="Sentry" type="micro" delay={0.55} className="w-full justify-start px-2" />
                    <Node title="Winston Logs" type="micro" delay={0.55} className="w-full justify-start px-2" />
                    <Node title="Correlation ID" type="micro" delay={0.55} className="w-full justify-start px-2" />
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
            <div className="hidden md:block overflow-x-auto bg-transparent border-t border-b border-[rgba(21,21,21,0.1)] py-4">
                <DiagramContent />
            </div>

            {/* Mobile View — Preview Card */}
            <div className="md:hidden border-t border-b border-[rgba(21,21,21,0.1)] py-6">
                <h4 className="text-[0.9375rem] font-bold tracking-[-0.02em] text-ink mb-2">Architecture Schema</h4>
                <p className="text-[0.8125rem] text-[rgba(21,21,21,0.60)] leading-relaxed mb-5">
                    Distributed Node.js backend with AI moderation workers, async queues, and comprehensive observability.
                </p>
                <button
                    onClick={() => setIsMobileExpanded(true)}
                    className="w-full py-3 border border-[rgba(21,21,21,0.15)] rounded-[4px] text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ink hover:bg-[rgba(21,21,21,0.02)] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    View Schema
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
                        initial={{ opacity: 0, y: '5%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '5%' }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center justify-between p-5 border-b border-[rgba(21,21,21,0.08)]">
                            <span className="text-[0.75rem] font-bold text-ink tracking-[0.1em] uppercase">Architecture Schema</span>
                            <button
                                onClick={() => setIsMobileExpanded(false)}
                                className="text-[rgba(21,21,21,0.40)] hover:text-ink transition-colors"
                                aria-label="Close viewer"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <TransformWrapper initialScale={0.4} minScale={0.3} maxScale={3} centerOnInit>
                                <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                                    <DiagramContent />
                                </TransformComponent>
                            </TransformWrapper>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-micro text-[rgba(21,21,21,0.40)]">Pinch to zoom, drag to pan</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
