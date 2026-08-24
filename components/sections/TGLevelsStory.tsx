'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback } from 'react';
import { BackgroundVisual } from '@/components/ui/BackgroundVisual';
import dynamic from 'next/dynamic';
import { getCertifications, getInternshipCertificates, getTimeline } from '@/lib/data-loader';

const CertificateModal = dynamic(() => import('@/components/CertificateModal'), { ssr: false });

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
    },
});

// ─── Workstream types ────────────────────────────────────────
type WorkstreamKey = 'crm' | 'tggd' | 'mwdw';

interface Workstream {
    key: WorkstreamKey;
    label: string;
    full: string;
    role: string;
    description: string;
    bullets: string[];
    tech: string[];
}

const WORKSTREAMS: Workstream[] = [
    {
        key: 'crm',
        label: 'CRM',
        full: 'CRM Phase 2',
        role: 'Frontend / Product Engineering',
        description: 'Built the CRM Phase 2 frontend from scratch. Designed and implemented the analytics dashboard, Leadership Hub, standardised filter architecture, shared filter context, and reusable component system.',
        bullets: [
            'Dashboard analytics views with date-range filtering',
            'Leadership Hub — hierarchical performance tracking',
            'Shared filter context architecture across pages',
            'Reusable component library and design-system refactor',
            'Next.js, TypeScript, Tailwind CSS',
        ],
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    },
    {
        key: 'tggd',
        label: 'TGGD',
        full: 'Trading Application',
        role: 'Integration / Debugging / Performance',
        description: 'Contributed to an existing Node.js/Express trading application (TGGD). Work focused on MW/DW/Wave logic integration, debugging Lightweight Charts performance issues, historical data loading, and data validation — not authorship of the full platform.',
        bullets: [
            'Integrated MW/DW/Wave detection logic into existing trading application',
            'Resolved Lightweight Charts rendering and performance bottlenecks',
            'Implemented historical data range handling',
            'Data validation and audit across trading datasets',
            'Node.js, Express, WebSocket/chart system',
        ],
        tech: ['Node.js', 'Express', 'WebSockets', 'Lightweight Charts'],
    },
    {
        key: 'mwdw',
        label: 'MW/DW',
        full: 'Research Pipeline',
        role: 'Python Research / Backtesting',
        description: 'Dedicated Python research and backtesting pipeline for MW/DW analysis. Converted CSV equity and NIFTY options datasets to partitioned Parquet, implemented wave detection, state tracking, and analytics pipeline.',
        bullets: [
            'Data quality validation and audit across equity/NIFTY datasets',
            'Wave detection algorithm implementation',
            'MW/DW state tracking and event logging',
            'Excursion analysis and heatmap generation',
            'CSV → partitioned Parquet conversion pipeline',
        ],
        tech: ['Python', 'Pandas', 'Parquet', 'NumPy'],
    },
];

// ─── Cert card (reused from ExperienceTimeline) ──────────────
interface InternshipCert {
    title: string;
    image: string;
}

const InternshipCertCard: React.FC<InternshipCert & { onOpen: (src: string, alt: string) => void }> = ({ title, image, onOpen }) => {
    const [imgError, setImgError] = useState(false);
    return (
        <div
            className="group relative rounded-[12px] overflow-hidden border border-[rgba(21,21,21,0.10)] bg-soft hover:border-[rgba(21,21,21,0.25)] transition-all duration-300 cursor-pointer"
            onClick={() => !imgError && onOpen(image, title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && !imgError && onOpen(image, title)}
            aria-label={`View ${title}`}
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-soft">
                {!imgError ? (
                    <Image src={image} alt={title} width={420} height={260} loading="lazy"
                        sizes="(max-width:768px) 100vw, 420px"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[rgba(21,21,21,0.30)] text-sm">
                        Image unavailable
                    </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="px-3 py-2 border-t border-[rgba(21,21,21,0.08)]">
                <p className="text-xs font-medium text-ink line-clamp-1">{title}</p>
            </div>
        </div>
    );
};

export const TGLevelsStory = () => {
    const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

    const openModal = useCallback((src: string, alt: string) => setModalImage({ src, alt }), []);
    const closeModal = useCallback(() => setModalImage(null), []);

    const internshipCertsMap = getInternshipCertificates();
    const tgCerts = internshipCertsMap?.['tglevels'] || [];

    return (
        <section id="experience" className="bg-paper section-pad-lg" aria-label="TG Levels engineering story">
            {modalImage && (
                <CertificateModal src={modalImage.src} alt={modalImage.alt} onClose={closeModal} />
            )}

            <div className="editorial-container">
                {/* Section header */}
                <motion.div
                    className="mb-[clamp(2.5rem,5dvh,5rem)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.38)] block mb-[clamp(0.75rem,2dvh,1rem)]">
                        05 / EXPERIENCE
                    </span>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-[clamp(2rem,5dvh,4rem)] items-end">
                        <div>
                            <h3 className="text-ink font-semibold tracking-[-0.02em] block mb-[clamp(0.75rem,2dvh,1rem)] text-xl">
                                TG Levels
                            </h3>
                            <h2
                                className="text-ink font-bold tracking-[-0.04em] leading-[0.94]"
                                style={{ fontSize: 'clamp(2.25rem, min(5vw, 7dvh), 4.5rem)' }}
                            >
                                Integration / Debugging /<br />Performance
                            </h2>
                        </div>
                        <div className="pb-1">
                            <span className="text-micro text-[rgba(21,21,21,0.35)] block mb-1">Context</span>
                            <span className="text-[rgba(21,21,21,0.52)] font-medium text-lg block mb-2">
                                Trading Application
                            </span>
                            <span className="text-[rgba(21,21,21,0.40)] font-semibold text-sm">
                                Software Developer Intern — May–Aug 2026
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Workstream content - sequential editorial chapters */}
                <div className="mt-[clamp(2rem,6dvh,4rem)]">
                    {WORKSTREAMS.map((active, index) => {
                        const isReversed = active.key === 'tggd';
                        
                        return (
                            <motion.div
                                key={active.key}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="relative border-t border-[rgba(21,21,21,0.12)] py-[clamp(4rem,10dvh,6rem)] overflow-hidden"
                            >
                                {/* Background Image Layer (only for crm and tggd) */}
                                {(active.key === 'crm' || active.key === 'tggd') && (
                                    <BackgroundVisual
                                        src={active.key === 'crm' ? '/images/03-tg-levels-crm.png' : '/images/02-tg-levels-chart.png'}
                                        theme="light"
                                        imageType="technical"
                                        contentAlignment={isReversed ? 'right' : 'left'}
                                        focalPosition={isReversed ? 'object-left lg:object-left' : 'object-right'}
                                    />
                                )}

                                <div className={`relative z-10 grid grid-cols-1 gap-[clamp(3rem,8dvh,6rem)] items-center ${
                                    isReversed ? 'lg:grid-cols-[55%_1fr]' : 'lg:grid-cols-[1fr_45%]'
                                }`}>
                                    {/* Text Content Column */}
                                    <div className={`flex flex-col ${isReversed ? 'order-1 lg:order-2 lg:pl-8' : 'order-1 lg:pr-8'}`}>
                                        <span className="text-micro text-[rgba(21,21,21,0.40)] font-bold block mb-[clamp(0.75rem,2dvh,1rem)] tracking-wider uppercase">
                                            0{index + 1} — {active.label}
                                        </span>
                                        <h3 className="text-ink font-bold tracking-[-0.03em] mb-[clamp(1.5rem,3dvh,2rem)] text-[clamp(1.5rem,min(3vw,4dvh),2.25rem)] leading-snug">
                                            {active.role}
                                        </h3>
                                        <p className="text-[rgba(21,21,21,0.65)] text-[clamp(1rem,min(1.5vw,2.5dvh),1.125rem)] leading-relaxed mb-[clamp(1.5rem,3dvh,2rem)] max-w-[540px]">
                                            {active.description}
                                        </p>

                                        <ul className="space-y-3 mb-[clamp(2rem,4dvh,3rem)]">
                                            {active.bullets.map((bullet) => (
                                                <li key={bullet} className="flex items-start gap-3 text-[0.9375rem] text-[rgba(21,21,21,0.60)]">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[rgba(21,21,21,0.2)] flex-shrink-0" aria-hidden="true" />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-1.5">
                                            {active.tech.map((t) => (
                                                <span key={t} className="tech-tag border-[rgba(21,21,21,0.1)] text-[rgba(21,21,21,0.6)] bg-paper/60 backdrop-blur-sm">{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right/Left Spacer Column */}
                                    <div className={`relative z-10 w-full h-full flex flex-col justify-center ${isReversed ? 'order-2 lg:order-1' : 'order-2'}`}>
                                        {active.key === 'mwdw' ? (
                                            /* MW/DW Pipeline structure */
                                            <div className="pl-6 lg:pl-10 border-l border-[rgba(21,21,21,0.15)] py-4">
                                                <div className="space-y-[clamp(1.5rem,3dvh,2rem)]">
                                                    {[
                                                        { n: '01', label: 'Data Quality', desc: 'Validation & audit' },
                                                        { n: '02', label: 'Wave Detection', desc: 'Algorithm implementation' },
                                                        { n: '03', label: 'MW/DW State', desc: 'State tracking & logging' },
                                                        { n: '04', label: 'Events / Excursions', desc: 'Analysis pipeline' },
                                                        { n: '05', label: 'Analytics / Heatmaps', desc: 'Visualization output' },
                                                    ].map((phase, i) => (
                                                        <div key={phase.n} className="flex gap-6 items-start group/phase">
                                                            <span className="text-micro text-[rgba(21,21,21,0.3)] group-hover/phase:text-ink transition-colors font-bold w-6">{phase.n}</span>
                                                            <div>
                                                                <p className="text-[0.9375rem] font-semibold text-ink leading-tight">{phase.label}</p>
                                                                <p className="text-[0.8125rem] text-[rgba(21,21,21,0.5)] mt-0.5">{phase.desc}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            /* Empty spacer block to allow the background image to occupy meaningful space */
                                            <div className="w-full h-[240px] lg:h-[480px] pointer-events-none" />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* MIRA Experience */}
                <motion.div
                    className="mt-[clamp(4rem,8dvh,7rem)] pt-[clamp(2rem,5dvh,2.5rem)] border-t border-[rgba(21,21,21,0.10)]"
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_140px] gap-[clamp(1.5rem,4dvh,3rem)]">
                        <div>
                            <span className="text-micro text-[rgba(21,21,21,0.30)] block mb-3">Previous</span>
                            <h3 className="text-ink font-bold text-xl tracking-[-0.025em] mb-1">
                                Python & Django Backend Developer Intern
                            </h3>
                            <p className="text-[0.875rem] font-medium text-cobalt">MIRA Advanced Engineering</p>
                        </div>
                        <div>
                            <ul className="space-y-2.5">
                                {[
                                    'Developed RESTful API endpoints using Django REST Framework',
                                    'Built backend CRUD modules with Django ORM and request validation',
                                    'Assisted in backend data processing pipelines and third-party API integration',
                                    'Improved backend reliability via structured error responses across endpoints',
                                ].map((pt, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[rgba(21,21,21,0.55)]">
                                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[rgba(21,21,21,0.30)] flex-shrink-0" aria-hidden="true" />
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-1.5 mt-5">
                                {['Python', 'Django', 'Django REST Framework', 'PostgreSQL'].map((t) => (
                                    <span key={t} className="tech-tag">{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="md:text-right">
                            <span className="text-micro text-[rgba(21,21,21,0.35)]">Jan – Mar 2024</span>
                        </div>
                    </div>
                </motion.div>

                {/* Certifications Carousel */}
                <motion.div
                    className="mt-[clamp(4rem,8dvh,7rem)]"
                    variants={fadeUp(0.12)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <CertificationsCarousel onOpen={openModal} />
                </motion.div>
            </div>
        </section>
    );
};

// ─── Certifications carousel (self-contained) ────────────────
const CertificationsCarousel: React.FC<{ onOpen: (src: string, alt: string) => void }> = ({ onOpen }) => {
    const { certifications } = getCertifications();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => { setMounted(true); }, []);

    const certs = certifications.map((c) => ({
        id: c.id,
        title: ((c as unknown) as Record<string, string>).title || c.name,
        image: ((c as unknown) as Record<string, string>).image || '',
    }));

    return (
        <div>
            <div className="flex items-center gap-4 mb-8 pb-5 border-b border-[rgba(21,21,21,0.08)]">
                <span className="text-micro text-[rgba(21,21,21,0.38)]">06 / CERTIFICATIONS</span>
            </div>
            {!mounted ? (
                <div className="flex gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex-none w-[220px] h-[165px] rounded-[12px] bg-soft animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="arsenal-slider-wrapper overflow-hidden w-full py-4 relative">
                    <div className="arsenal-slider-track items-center">
                        {[...certs, ...certs].map((cert, index) => (
                            <MiniCertCard key={`${cert.id}-${index}`} title={cert.title} image={cert.image} onOpen={onOpen} />
                        ))}
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-20" style={{ background: 'linear-gradient(to right, var(--paper), transparent)' }} />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-20" style={{ background: 'linear-gradient(to left, var(--paper), transparent)' }} />
                </div>
            )}
        </div>
    );
};

const MiniCertCard: React.FC<{ title: string; image: string; onOpen: (src: string, alt: string) => void }> = ({ title, image, onOpen }) => {
    const [imgError, setImgError] = useState(false);
    return (
        <div className="flex-none w-[220px] px-1.5">
            <div
                className="group relative rounded-[12px] overflow-hidden border border-[rgba(21,21,21,0.10)] bg-soft hover:border-[rgba(21,21,21,0.25)] cursor-pointer transition-all duration-300"
                onClick={() => !imgError && onOpen(image, `${title} Certificate`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && !imgError && onOpen(image, `${title} Certificate`)}
                aria-label={`View ${title} Certificate`}
            >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-soft">
                    {!imgError ? (
                        <Image src={image} alt={`${title} Certificate`} width={420} height={260} loading="lazy"
                            sizes="220px" onError={() => setImgError(true)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[rgba(21,21,21,0.25)] text-xs">No image</div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="pointer-events-none absolute bottom-2 left-3 right-3 text-white text-[0.6875rem] font-medium truncate">{title}</span>
                </div>
            </div>
        </div>
    );
};
