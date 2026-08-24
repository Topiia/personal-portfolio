'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCallback } from 'react';
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
    const [activeWorkstream, setActiveWorkstream] = useState<WorkstreamKey>('crm');
    const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

    const openModal = useCallback((src: string, alt: string) => setModalImage({ src, alt }), []);
    const closeModal = useCallback(() => setModalImage(null), []);

    const internshipCertsMap = getInternshipCertificates();
    const tgCerts = internshipCertsMap?.['tglevels'] || [];

    const active = WORKSTREAMS.find((w) => w.key === activeWorkstream)!;

    return (
        <section id="experience" className="bg-paper section-pad-lg" aria-label="TG Levels engineering story">
            {modalImage && (
                <CertificateModal src={modalImage.src} alt={modalImage.alt} onClose={closeModal} />
            )}

            <div className="editorial-container">
                {/* Section header */}
                <motion.div
                    className="mb-14 md:mb-20"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.38)] block mb-4">
                        05 / EXPERIENCE
                    </span>
                    <h2
                        className="text-ink font-bold tracking-[-0.04em] leading-[0.94] mb-5"
                        style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}
                    >
                        TG Levels
                        <br />
                        <span className="text-[rgba(21,21,21,0.40)] font-semibold" style={{ fontSize: '0.6em' }}>
                            Software Developer Intern — May–Aug 2026
                        </span>
                    </h2>
                    <p className="text-[rgba(21,21,21,0.52)] text-lg max-w-[600px] leading-relaxed">
                        Three distinct engineering workstreams across frontend product,
                        trading application integration, and Python research infrastructure.
                    </p>
                </motion.div>

                {/* Workstream navigation */}
                <motion.div
                    className="flex gap-0 mb-10 md:mb-14 border-b border-[rgba(21,21,21,0.10)]"
                    variants={fadeUp(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {WORKSTREAMS.map((ws) => (
                        <button
                            key={ws.key}
                            onClick={() => setActiveWorkstream(ws.key)}
                            className={`relative px-6 py-4 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-200 ${
                                activeWorkstream === ws.key
                                    ? 'text-ink'
                                    : 'text-[rgba(21,21,21,0.36)] hover:text-[rgba(21,21,21,0.65)]'
                            }`}
                            aria-pressed={activeWorkstream === ws.key}
                        >
                            {ws.label}
                            {activeWorkstream === ws.key && (
                                <motion.div
                                    layoutId="workstream-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-acid"
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Workstream content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeWorkstream}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16"
                    >
                        {/* Left: content */}
                        <div>
                            <span className="text-micro text-[rgba(21,21,21,0.35)] block mb-3">
                                {active.role}
                            </span>
                            <h3
                                className="text-ink font-bold tracking-[-0.03em] mb-5"
                                style={{ fontSize: 'clamp(1.375rem, 3vw, 2.25rem)' }}
                            >
                                {active.full}
                            </h3>
                            <p className="text-[rgba(21,21,21,0.56)] text-base leading-relaxed mb-8 max-w-[520px]">
                                {active.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {active.bullets.map((bullet) => (
                                    <li key={bullet} className="flex items-start gap-3 text-[0.9375rem] text-[rgba(21,21,21,0.58)]">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-acid flex-shrink-0" aria-hidden="true" />
                                        {bullet}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-1.5">
                                {active.tech.map((t) => (
                                    <span key={t} className="tech-tag">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Right: internship photos or phase diagram */}
                        <div className="flex flex-col gap-6">
                            {/* Pipeline diagram for MW/DW */}
                            {activeWorkstream === 'mwdw' && (
                                <div className="bg-soft rounded-[20px] p-6">
                                    <p className="text-micro text-[rgba(21,21,21,0.40)] mb-6">Research pipeline phases</p>
                                    <div className="space-y-0">
                                        {[
                                            { n: '01', label: 'Data Quality', desc: 'Validation & audit' },
                                            { n: '02', label: 'Wave Detection', desc: 'Algorithm implementation' },
                                            { n: '03', label: 'MW/DW State', desc: 'State tracking & logging' },
                                            { n: '04', label: 'Events / Excursions', desc: 'Analysis pipeline' },
                                            { n: '05', label: 'Analytics / Heatmaps', desc: 'Visualization output' },
                                        ].map((phase, i) => (
                                            <div key={phase.n} className="flex gap-5 items-start">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-micro text-acid w-6 text-center">{phase.n}</span>
                                                    {i < 4 && <div className="w-px h-8 bg-[rgba(21,21,21,0.10)] mt-1" />}
                                                </div>
                                                <div className="pb-5">
                                                    <p className="text-[0.9375rem] font-semibold text-ink">{phase.label}</p>
                                                    <p className="text-[0.8125rem] text-[rgba(21,21,21,0.44)]">{phase.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Internship certs for CRM/TGGD */}
                            {activeWorkstream !== 'mwdw' && tgCerts.length > 0 && (
                                <div>
                                    <p className="text-micro text-[rgba(21,21,21,0.38)] mb-4">Internship certificates</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {tgCerts.map((cert: InternshipCert, i: number) => (
                                            <InternshipCertCard
                                                key={i}
                                                title={cert.title}
                                                image={cert.image}
                                                onOpen={openModal}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Office photos — CRM only */}
                            {activeWorkstream === 'crm' && (
                                <div>
                                    <p className="text-micro text-[rgba(21,21,21,0.38)] mb-4">@ Mentorchamp EdTech Pvt. Ltd. (TG Levels)</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            '/images/WhatsApp Image 2026-08-11 at 6.33.47 PM.jpeg',
                                            '/images/WhatsApp Image 2026-08-12 at 3.00.01 PM.jpeg',
                                            '/images/WhatsApp Image 2026-08-12 at 3.00.05 PM.jpeg',
                                        ].map((src, i) => (
                                            <div
                                                key={i}
                                                className="relative aspect-[3/4] overflow-hidden rounded-[12px]"
                                                style={{ transform: i === 1 ? 'translateY(-8px)' : i === 2 ? 'translateY(4px)' : 'none' }}
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`TG Levels internship — photo ${i + 1}`}
                                                    fill
                                                    sizes="(max-width:768px) 33vw, 120px"
                                                    className="object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* MIRA Experience */}
                <motion.div
                    className="mt-20 md:mt-28 pt-10 border-t border-[rgba(21,21,21,0.10)]"
                    variants={fadeUp(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_140px] gap-6 md:gap-12">
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
                    className="mt-20 md:mt-28"
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
