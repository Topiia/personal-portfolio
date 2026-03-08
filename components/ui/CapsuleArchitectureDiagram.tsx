'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NodeProps {
    title: string;
    type?: 'primary' | 'secondary' | 'micro';
    delay?: number;
    className?: string;
}

const Node: React.FC<NodeProps> = ({ title, type = 'secondary', delay = 0, className }) => {
    const baseStyle = "flex items-center justify-center text-center rounded-lg border shadow-sm transition-colors z-10 relative";
    
    const styles = {
        primary: "bg-surface/80 border-accent/40 text-textHeading font-semibold px-6 py-3 min-w-[160px]",
        secondary: "bg-surface/50 border-white/10 text-textMuted text-sm px-4 py-2 min-w-[130px] hover:border-white/20 hover:text-textHeading",
        micro: "bg-background/50 border-white/5 text-textMuted/80 text-xs px-3 py-1.5 min-w-[100px]"
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay, duration: 0.4 }}
            className={cn(baseStyle, styles[type], className)}
        >
            {title}
        </motion.div>
    );
};

// Connection Lines
const VLine = ({ type = 'solid', className }: { type?: 'solid' | 'dashed' | 'dotted', className?: string }) => {
    const borders = {
        solid: 'border-l-2 border-accent/30',
        dashed: 'border-l-2 border-dashed border-white/20',
        dotted: 'border-l-2 border-dotted border-white/20'
    };
    return <div className={cn(`w-px h-8 relative`, borders[type], className)} />;
};

const HLine = ({ type = 'solid', className }: { type?: 'solid' | 'dashed' | 'dotted', className?: string }) => {
    const borders = {
        solid: 'border-t-2 border-accent/30',
        dashed: 'border-t-2 border-dashed border-white/20',
        dotted: 'border-t-2 border-dotted border-white/20'
    };
    return <div className={cn(`h-px w-8 relative`, borders[type], className)} />;
};

const ArrowDown = () => (
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border-b-2 border-r-2 border-accent/40 rotate-45" />
);


export const CapsuleArchitectureDiagram: React.FC = () => {
    return (
        <div className="bg-surface/20 rounded-xl p-4 md:p-8 border border-white/5 overflow-x-auto">
            <div className="min-w-[800px] flex flex-col items-center font-outfit relative py-8">
                
                {/* 1. CLIENT LAYER */}
                <Node title="Client (React SPA)" type="primary" delay={0.1} />

                <div className="flex flex-col items-center">
                    <VLine />
                    <ArrowDown />
                </div>

                {/* 2. EDGE SECURITY LAYER */}
                <div className="flex flex-col items-center space-y-2 p-4 rounded-xl border border-white/10 bg-surface/30 relative">
                    <div className="absolute -top-3 left-4 text-[10px] text-textMuted uppercase tracking-wider font-mono">Edge Security Middleware</div>
                    <Node title="CORS Policy" type="micro" delay={0.2} />
                    <VLine type="solid" className="h-4" />
                    <Node title="Helmet Security Headers" type="micro" delay={0.2} />
                    <VLine type="solid" className="h-4" />
                    <Node title="Rate Limiter" type="micro" delay={0.2} />
                    <VLine type="solid" className="h-4" />
                    <Node title="JSON Parser" type="micro" delay={0.2} />
                    <VLine type="solid" className="h-4" />
                    <Node title="Auth Middleware (JWT Cookie)" type="secondary" delay={0.2} className="border-accent/20 text-accent/90 bg-accent/5" />
                </div>

                <div className="flex flex-col items-center">
                    <VLine />
                    <ArrowDown />
                </div>

                {/* 3. ROUTING LAYER */}
                <Node title="Express Router" type="primary" delay={0.3} />

                <div className="flex flex-col items-center">
                    <VLine className="h-10" />
                    <ArrowDown />
                    {/* Horizontal fork line for controllers */}
                    <div className="w-[600px] border-t-2 border-accent/30 h-px relative -mt-5" />
                    
                    {/* Vertical drops for controllers */}
                    <div className="flex justify-between w-[600px] mt-0">
                        <VLine className="h-5" /><VLine className="h-5" /><VLine className="h-5" /><VLine className="h-5" />
                    </div>
                </div>

                {/* 4. CONTROLLER LAYER */}
                <div className="flex justify-between w-[680px] mt-2 mb-8 relative">
                     <div className="absolute -top-8 -left-4 text-[10px] text-textMuted uppercase tracking-wider font-mono">Controller Layer</div>
                    <Node title="Auth Controller" type="secondary" delay={0.4} />
                    <Node title="Video Controller" type="secondary" delay={0.4} />
                    <Node title="Comment Controller" type="secondary" delay={0.4} />
                    <Node title="User Controller" type="secondary" delay={0.4} />
                </div>

                {/* Vertical drops to Services */}
                <div className="flex justify-between w-[600px] -mt-6 mb-2">
                    <VLine className="h-8" /><VLine className="h-8" /><VLine className="h-8" /><VLine className="h-8" />
                </div>
                
                {/* 5. SERVICE LAYER */}
                <div className="flex justify-between w-[680px] mb-12 relative p-4 rounded-xl border border-white/5 bg-surface/20">
                    <div className="absolute -top-3 left-4 text-[10px] text-textMuted uppercase tracking-wider font-mono">Service Layer</div>
                    <Node title="Auth Service" type="secondary" delay={0.5} />
                    <div className="relative">
                        <Node title="Video Service" type="secondary" delay={0.5} className="border-accent/30" />
                        
                        {/* Branch to Async Queue */}
                        <div className="absolute top-1/2 left-full flex items-center w-24">
                            <HLine type="dashed" className="w-full" />
                            <div className="w-2 h-2 border-t-2 border-r-2 border-white/20 rotate-45 -ml-1.5" />
                        </div>
                    </div>
                    <Node title="Comment Service" type="secondary" delay={0.5} />
                    <Node title="User Service" type="secondary" delay={0.5} />
                </div>


                {/* DATA & ASYNC SPLIT */}
                <div className="flex w-full max-w-[900px] justify-between px-8 relative">
                    
                    {/* 6. DATA LAYER */}
                    <div className="flex flex-col gap-6 w-1/3">
                        <div className="relative p-5 rounded-xl border border-white/10 bg-surface/30">
                           <div className="absolute -top-3 -left-2 text-[10px] text-textMuted uppercase tracking-wider font-mono bg-background px-2">Data Layer</div>
                            
                            <Node title="MongoDB Database" type="primary" delay={0.6} className="mb-6 w-full" />
                            
                            <Node title="Redis Cache" type="primary" delay={0.6} className="w-full" />
                            
                            <div className="mt-4 flex flex-col gap-2 pl-4 border-l-2 border-dashed border-white/10">
                                <Node title="Feed Cache" type="micro" delay={0.65} className="w-fit" />
                                <Node title="Session Store" type="micro" delay={0.65} className="w-fit" />
                                <Node title="Rate Limit Store" type="micro" delay={0.65} className="w-fit" />
                            </div>
                        </div>
                    </div>

                    {/* 7. ASYNC PROCESSING PIPELINE */}
                    <div className="flex flex-col items-center w-1/2 ml-16 relative">
                        {/* Connection from Video Service */}
                        <div className="absolute -top-16 left-1/2 w-px h-16 border-l-2 border-dashed border-white/20" />
                        
                        <div className="relative p-6 rounded-xl border border-white/10 bg-surface/30 w-full flex flex-col items-center">
                            <div className="absolute -top-3 -left-2 text-[10px] text-textMuted uppercase tracking-wider font-mono bg-background px-2">Async Queue System</div>
                            
                            <Node title="Bull Queue Manager" type="primary" delay={0.7} className="w-full mb-6 border-accent/20" />
                            
                            <div className="flex flex-col gap-4 w-full">
                                <Node title="Email Worker" type="secondary" delay={0.75} className="w-full justify-start pl-6" />
                                
                                <div className="relative w-full">
                                    <Node title="AI Moderation Worker" type="secondary" delay={0.75} className="w-full justify-start pl-6 border-accent/30" />
                                    
                                    {/* 8. AI MODERATION SUBSYSTEM */}
                                    <div className="mt-3 ml-6 pl-4 border-l-2 border-dashed border-accent/30 flex flex-col gap-2">
                                        <Node title="Groq LLM API" type="micro" delay={0.8} className="w-fit border-accent/20 text-accent/80" />
                                        <Node title="HuggingFace NLP Model" type="micro" delay={0.8} className="w-fit border-accent/20 text-accent/80" />
                                        <Node title="Trust Score Evaluator" type="micro" delay={0.8} className="w-fit border-accent/20 text-accent/80" />
                                    </div>
                                </div>

                                <Node title="Account Cleanup Worker" type="secondary" delay={0.75} className="w-full justify-start pl-6" />
                            </div>

                        </div>
                    </div>

                    {/* 9. OBSERVABILITY LAYER */}
                    <div className="absolute right-0 top-10 flex flex-col gap-3">
                        <div className="absolute -top-6 right-0 text-[10px] text-textMuted uppercase tracking-wider font-mono text-right w-32">Observability Logging & Telemetry</div>
                        
                        {/* Telemetry connection lines mapping */}
                        <div className="absolute top-4 -left-[600px] w-[600px] h-px border-t-2 border-dotted border-white/10 -z-10" />
                        <div className="absolute top-16 -left-[300px] w-[300px] h-px border-t-2 border-dotted border-white/10 -z-10" />
                        <div className="absolute top-28 -left-[450px] w-[450px] h-px border-t-2 border-dotted border-white/10 -z-10" />
                        
                        <Node title="Prometheus Metrics" type="micro" delay={0.9} className="opacity-70 !bg-surface/10 justify-end pr-4 text-right" />
                        <Node title="Sentry Error Tracking" type="micro" delay={0.9} className="opacity-70 !bg-surface/10 justify-end pr-4 text-right" />
                        <Node title="Winston Structured Logs" type="micro" delay={0.9} className="opacity-70 !bg-surface/10 justify-end pr-4 text-right" />
                        <Node title="Correlation ID Tracing" type="micro" delay={0.9} className="opacity-70 !bg-surface/10 justify-end pr-4 text-right" />
                    </div>

                </div>
                
            </div>
        </div>
    );
};
