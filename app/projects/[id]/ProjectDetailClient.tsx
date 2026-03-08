'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectWithMedia } from '@/types';
import { cn } from '@/lib/utils';
import { RequestFlowDiagram } from '@/components/ui/RequestFlowDiagram';
import { CapsuleArchitectureDiagram } from '@/components/ui/CapsuleArchitectureDiagram';

const capsuleEngineeringDetails = {
    securityHardening: {
        title: "Security Hardening",
        items: [
            "Removed accessToken and refreshToken from JSON API responses to eliminate XSS token exposure.",
            "All authentication tokens are now delivered via HttpOnly and Secure cookies.",
            "Refresh token lifecycle hardened using rotation and reuse detection.",
            "Authentication flow redesigned to prevent client-side access to sensitive tokens.",
            "Strict CORS allowlist implemented to block unauthorized cross-origin requests.",
            "Helmet middleware integrated to enforce modern HTTP security headers.",
            "MongoDB query sanitization added to prevent NoSQL injection."
        ]
    },
    configurationHardening: {
        title: "Configuration & Secrets Management",
        items: [
            "Removed unsafe fallback secrets such as 'testsecret' from JWT configuration logic.",
            "Implemented strict environment validation during application boot.",
            "Application now terminates startup if critical environment variables are missing.",
            "Critical variables validated include JWT_SECRET, REDIS_URL, FRONTEND_URL, and RESEND_API_KEY.",
            "Removed hardcoded credentials from database seeding scripts.",
            "Database seeding now requires explicit SEED_PASSWORD environment configuration."
        ]
    },
    observability: {
        title: "Production Observability",
        items: [
            "Integrated Sentry v10 SDK for centralized error monitoring.",
            "Prometheus metrics implemented using prom-client.",
            "Queue telemetry exposed including queue_waiting, queue_active, queue_completed, and queue_failed.",
            "Redis Bull queue monitoring dashboards implemented.",
            "Correlation ID tracing added to track requests across services.",
            "Structured logging implemented using Winston with log rotation."
        ]
    },
    queueReliability: {
        title: "Async Processing Reliability",
        items: [
            "Dead Letter Queue system implemented for permanently failed background jobs.",
            "DLQ monitoring service isolates poisoned jobs automatically.",
            "Queue spike detector alerts when failure rates exceed operational thresholds.",
            "Exponential retry strategy implemented for failed worker tasks.",
            "Background worker failures are isolated from primary API request lifecycle."
        ]
    },
    cicd: {
        title: "CI/CD Pipeline Stability",
        items: [
            "Resolved ESLint formatting violations that previously broke CI pipelines.",
            "Strict lint enforcement enabled with npm run lint -- --max-warnings=0.",
            "CI pipeline verified locally to match GitHub Actions workflow.",
            "Repository now maintains zero lint violations."
        ]
    },
    testing: {
        title: "Test Infrastructure Improvements",
        items: [
            "Security tests updated to support HttpOnly cookie authentication.",
            "Token assertions migrated from JSON responses to Set-Cookie header parsing.",
            "Implemented cookie extraction helpers for integration tests.",
            "Injected safe environment variables during Jest bootstrap.",
            "Achieved 162/162 passing unit and integration tests."
        ]
    },
    engineeringOutcome: {
        title: "Engineering Outcome",
        items: [
            "Authentication flow hardened against token leakage vulnerabilities.",
            "Application configuration now fails securely during invalid boot conditions.",
            "Background worker reliability improved with DLQ isolation.",
            "Production monitoring established using Sentry and Prometheus.",
            "CI/CD pipeline stabilized through strict lint enforcement.",
            "Full automated test suite passing across all security pathways."
        ]
    }
};

interface ProjectDetailClientProps {
    project: ProjectWithMedia;
}

export const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({ project }) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const videos = project.media?.videos || [];
    const images = project.media?.images || [];

    return (
        <article>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 text-xs font-bold tracking-widest text-white bg-accent rounded-full">
                        {project.status}
                    </span>
                    <span className="text-textMuted text-sm">{project.complexityLevel}</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-textHeading font-outfit mb-6 leading-tight">
                    {project.title}
                </h1>

                <p className="text-xl md:text-2xl text-textMuted font-light leading-relaxed mb-10 border-l-4 border-accent pl-6 max-w-4xl">
                    {project.impactStatement}
                </p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                {/* Left: Description + Problem */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Description */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-2xl font-bold text-textHeading font-outfit mb-4">Description</h2>
                        <p className="text-textMuted leading-relaxed text-lg">{project.description}</p>
                    </motion.section>

                    {/* Problem Solved */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-textHeading font-outfit mb-4">Problem Solved</h2>
                        <p className="text-textMuted leading-relaxed text-lg">{project.problemSolved}</p>
                    </motion.section>

                    {/* Architecture */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-textHeading font-outfit mb-4">Architecture</h2>
                        <p className="text-textMuted leading-relaxed text-lg">{project.architecture}</p>
                    </motion.section>
                </div>

                {/* Right Sidebar: Tech Stack + Tags */}
                <div className="space-y-8">
                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-surface/40 rounded-xl p-6 border border-border"
                    >
                        <h3 className="text-lg font-bold text-textHeading mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1.5 text-xs font-mono text-textHeading bg-surface border border-border rounded-md">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tags */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-surface/40 rounded-xl p-6 border border-border"
                    >
                        <h3 className="text-lg font-bold text-textHeading mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1.5 text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Scalability Badges */}
                    {project.scalability && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-surface/40 rounded-xl p-6 border border-border"
                        >
                            <h3 className="text-lg font-bold text-textHeading mb-4">Scalability</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.scalability.badges.map((badge) => (
                                    <span key={badge} className="px-3 py-1 text-xs font-medium text-textHeading bg-surface border border-border rounded-md">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                            <p className="text-textMuted text-sm leading-relaxed">{project.scalability.description}</p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Architecture Breakdown */}
            {project.architectureBreakdown && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-textHeading font-outfit mb-8">Architecture Breakdown</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(project.architectureBreakdown).map(([key, section]: [string, any]) => {
                            if (key === 'systemStructure') return null;
                            return (
                                <div key={key} className="border border-border rounded-lg overflow-hidden bg-surface/40">
                                    <button
                                        onClick={() => toggleSection(key)}
                                        className="w-full flex justify-between items-center p-4 text-left hover:bg-surface/60 transition-colors"
                                    >
                                        <span className="font-semibold text-textHeading">{section.title}</span>
                                        <span className={cn("transform transition-transform duration-300 text-accent", activeSection === key ? "rotate-180" : "")}>
                                            ▼
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {activeSection === key && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 pt-0 text-sm text-textMuted space-y-2 border-t border-border bg-surface/20">
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {section.items.map((item: string, i: number) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </motion.section>
            )}

            {/* Request Lifecycle Diagram */}
            {project.architectureBreakdown && project.architectureBreakdown.systemStructure && project.architectureBreakdown.systemStructure.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-textHeading font-outfit mb-6">System Architecture</h2>
                    {project.id === 'capsule' ? (
                        <CapsuleArchitectureDiagram />
                    ) : (
                        <RequestFlowDiagram steps={project.architectureBreakdown.systemStructure} />
                    )}
                </motion.section>
            )}

            {/* Post-Forensic Engineering Improvements (Capsule Only) */}
            {project.id === 'capsule' && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-textHeading font-outfit mb-8">Post-Forensic Engineering Improvements</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {Object.entries(capsuleEngineeringDetails).map(([key, section]) => (
                            <div key={key} className="bg-surface/30 rounded-xl p-6 md:p-8 border border-border">
                                <h3 className="text-xl font-bold text-textHeading mb-4">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-textMuted text-sm md:text-base leading-relaxed">
                                            <span className="text-accent mt-1.5 flex-shrink-0 text-xs">▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Engineering Decisions */}
            {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-textHeading font-outfit mb-6">Engineering Decisions</h2>
                    <div className="bg-surface/40 rounded-xl p-6 border border-border">
                        <ul className="space-y-3">
                            {project.engineeringDecisions.map((decision, i) => (
                                <li key={i} className="flex items-start gap-3 text-textMuted">
                                    <span className="text-accent mt-1 flex-shrink-0">▹</span>
                                    {decision}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.section>
            )}

            {/* Production Readiness */}
            {project.productionReadiness && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-textHeading font-outfit mb-6">Production Readiness</h2>
                    <div className="bg-surface/40 rounded-xl p-6 border border-border">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.productionReadiness.checked.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                                    <span className="text-green-500 flex-shrink-0">✔</span> {item}
                                </div>
                            ))}
                            {project.productionReadiness.unchecked.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-orange-600/80 dark:text-orange-400/80 opacity-80">
                                    <span className="text-orange-500 flex-shrink-0">⚠</span> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Media Proof Section */}
            {(videos.length > 0 || images.length > 0) && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl font-bold text-textHeading font-outfit mb-8">Media Proof</h2>

                    {/* Project Videos */}
                    {videos.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-textHeading mb-4">Project Videos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {videos.map((videoSrc, i) => (
                                    <div key={i} className="rounded-xl overflow-hidden border border-border bg-surface/30">
                                        <video
                                            src={videoSrc}
                                            controls
                                            muted
                                            playsInline
                                            preload="metadata"
                                            className="w-full aspect-video object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Project Screenshots */}
                    {images.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-textHeading mb-4">Project Screenshots</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {images.map((imgSrc, i) => (
                                    <div key={i} className="rounded-xl overflow-hidden border border-border bg-surface/30">
                                        <img
                                            src={imgSrc}
                                            alt={`${project.title} Screenshot ${i + 1}`}
                                            loading="lazy"
                                            className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.section>
            )}
        </article>
    );
};
