import React from 'react';
import { motion } from 'framer-motion';

interface RequestFlowDiagramProps {
    steps: string[];
}

export const RequestFlowDiagram: React.FC<RequestFlowDiagramProps> = ({ steps }) => {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="bg-surface/30 rounded-xl p-8 border border-border flex flex-col items-center">
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
};
