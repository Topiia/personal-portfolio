'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getTimeline, getCertifications, getInternshipCertificates } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { ImageOff, Award } from 'lucide-react';

// Dynamically import modal to keep initial bundle lean
const CertificateModal = dynamic(() => import('@/components/CertificateModal'), { ssr: false });

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
interface InternshipCert {
    title: string;
    image: string;
}

/* ─────────────────────────────────────────────────────────────
   Certificate Thumbnail Card — kept intact, re-styled
───────────────────────────────────────────────────────────── */
interface CertCardProps {
    title: string;
    image: string;
    onOpen: (src: string, alt: string) => void;
}

const CertCard: React.FC<CertCardProps> = React.memo(({ title, image, onOpen }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="flex-none w-[220px] sm:w-[260px] px-2 transition-all duration-300"
        >
            <div
                className="group relative rounded-sm overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-all duration-300 hover:border-[var(--color-accent)] cursor-pointer"
                onClick={() => !imgError && onOpen(image, `${title} Certificate`)}
                aria-label={`View ${title} Certificate`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && !imgError && onOpen(image, `${title} Certificate`)}
            >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--color-card)]">
                    {!imgError ? (
                        <Image
                            src={image}
                            alt={`${title} Certificate`}
                            width={420}
                            height={260}
                            loading="lazy"
                            sizes="(max-width:768px) 90vw, 420px"
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[var(--color-textMuted)]">
                            <ImageOff className="w-8 h-8 opacity-30" />
                            <span className="text-xs opacity-30 text-center px-4">
                                Missing image<br />
                                <code className="truncate max-w-full block px-2">{image}</code>
                            </span>
                        </div>
                    )}
                    {!imgError && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white text-xs font-medium bg-black/60 px-3 py-1 rounded-sm">
                                View
                            </span>
                        </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="pointer-events-none absolute bottom-2 left-3 right-3 text-white text-xs font-medium truncate">
                        {title}
                    </span>
                </div>
            </div>
        </div>
    );
});
CertCard.displayName = 'CertCard';

/* ─────────────────────────────────────────────────────────────
   Certifications Carousel — infinite scroll (logic unchanged)
───────────────────────────────────────────────────────────── */
const CertCarousel: React.FC<{ onOpen: (src: string, alt: string) => void }> = React.memo(({ onOpen }) => {
    const { certifications } = getCertifications();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const certs = React.useMemo(() => certifications.map(c => ({
        id: c.id,
        title: (c as any).title || c.name,
        image: (c as any).image || ''
    })), [certifications]);

    if (!mounted) {
        return (
            <div className="overflow-hidden py-8">
                <div className="flex justify-center gap-6">
                    {certs.slice(0, 3).map(c => (
                        <div key={c.id} className="flex-none w-[260px] h-[195px] rounded-sm bg-[var(--color-surface)] border border-[var(--color-border)] animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="arsenal-slider-wrapper overflow-hidden w-full py-8 relative">
            <div className="arsenal-slider-track items-center">
                {[...certs, ...certs].map((cert, index) => (
                    <CertCard
                        key={`${cert.id}-${index}`}
                        title={cert.title}
                        image={cert.image}
                        onOpen={onOpen}
                    />
                ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-20 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-20 bg-gradient-to-l from-[var(--color-background)] to-transparent" />
        </div>
    );
});
CertCarousel.displayName = 'CertCarousel';

/* ─────────────────────────────────────────────────────────────
   Internship Certificate Thumbnail (click → modal)
───────────────────────────────────────────────────────────── */
const InternshipCertCard: React.FC<InternshipCert & { onOpen: (src: string, alt: string) => void }> = React.memo(({ title, image, onOpen }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="group relative rounded-sm overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-all duration-300 cursor-pointer"
            onClick={() => !imgError && onOpen(image, title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && !imgError && onOpen(image, title)}
            aria-label={`View ${title}`}
        >
            <div className="relative w-full aspect-[4/3] bg-[var(--color-card)] overflow-hidden">
                {!imgError ? (
                    <>
                        <Image
                            src={image}
                            alt={title}
                            width={420}
                            height={260}
                            loading="lazy"
                            sizes="(max-width:768px) 100vw, 420px"
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white text-xs font-medium bg-black/60 px-3 py-1 rounded-sm">View</span>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[var(--color-textMuted)]">
                        <ImageOff className="w-8 h-8 opacity-30" />
                        <span className="text-xs opacity-30 text-center px-4">
                            Missing image<br />
                            <code className="truncate block px-2">{image}</code>
                        </span>
                    </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="px-3 py-2 border-t border-[var(--color-border)]">
                <p className="text-xs font-medium text-[var(--color-textPrimary)] line-clamp-1">{title}</p>
            </div>
        </div>
    );
});
InternshipCertCard.displayName = 'InternshipCertCard';

/* ─────────────────────────────────────────────────────────────
   Experience Photo Strip — for TG Levels
───────────────────────────────────────────────────────────── */
interface ExperiencePhotoStripProps {
    images: string[];
    company: string;
    duration: string;
}

const ExperiencePhotoStrip: React.FC<ExperiencePhotoStripProps> = ({ images, company, duration }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="mt-8 pt-6 border-t border-[var(--color-rule)]">
            <p className="mono-label mb-4">@ {company} — {duration}</p>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className={`relative overflow-hidden rounded-sm ${idx === 0 ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}
                        style={{
                            transform: idx === 1 ? 'translateY(-8px)' : idx === 2 ? 'translateY(4px)' : 'none',
                        }}
                    >
                        <Image
                            src={src}
                            alt={`${company} — photo ${idx + 1}`}
                            fill
                            sizes="(max-width:768px) 33vw, 200px"
                            className="object-cover"
                            loading="lazy"
                        />
                        {/* Subtle dark overlay to blend with theme */}
                        <div className="absolute inset-0 bg-[var(--color-background)] opacity-[0.08]" />
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export const ExperienceTimeline = () => {
    const [mounted, setMounted] = useState(false);
    const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const openModal = useCallback((src: string, alt: string) => {
        setModalImage({ src, alt });
    }, []);

    const closeModal = useCallback(() => {
        setModalImage(null);
    }, []);

    const timeline = getTimeline();
    const internshipCertsMap = getInternshipCertificates();

    const educationEntries = timeline.filter((item) => item.type === 'education');
    const experienceEntries = timeline.filter((item) => item.type === 'experience');
    const higherEduEntries = educationEntries.filter((e) => e.group !== 'school');
    const schoolGroupEntry = educationEntries.find((e) => e.group === 'school');

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <Section id="experience" className="py-16 sm:py-24 md:py-32">
            {/* Certificate modal */}
            {mounted && modalImage && (
                <CertificateModal src={modalImage.src} alt={modalImage.alt} onClose={closeModal} />
            )}

            {/* Section header — left aligned, editorial */}
            <div className="max-w-[1320px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
                <div className="flex items-end justify-between border-b border-[var(--color-rule)] pb-6">
                    <div>
                        <span className="mono-label text-[var(--color-accent)] block mb-3">01 / Experience</span>
                        <h2 className="font-outfit font-bold text-[var(--color-textPrimary)] tracking-tight text-3xl md:text-5xl">
                            Professional<br />Trajectory
                        </h2>
                    </div>
                    <span className="mono-label hidden md:block pb-1">
                        {experienceEntries.length} role{experienceEntries.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Experience entries */}
            <div className="max-w-[1320px] mx-auto px-6 md:px-10">
                <div className="space-y-0">
                    {experienceEntries.map((item, idx) => {
                        const companyId = item.id.split('-')[0];
                        const internshipCerts = internshipCertsMap?.[companyId] || [];
                        const expImages = (item as any).images as string[] | undefined;
                        const isFeatured = idx === 0; // Most recent = most prominent

                        return (
                            <motion.div
                                key={item.id}
                                variants={rowVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-60px' }}
                                className="group"
                            >
                                <div className={`grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 py-10 md:py-14 border-b border-[var(--color-rule)] ${isFeatured ? 'md:items-start' : 'md:items-start'}`}>

                                    {/* Left — index + role */}
                                    <div className="md:w-[280px] flex-shrink-0">
                                        <span className="mono-label text-[var(--color-textMuted)] block mb-3">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="font-outfit font-bold text-[var(--color-textPrimary)] text-xl md:text-2xl leading-tight tracking-tight mb-1">
                                            {item.role}
                                        </h3>
                                        <p className="text-sm font-medium text-[var(--color-accent)]">
                                            {item.company}
                                        </p>
                                    </div>

                                    {/* Center — bullets */}
                                    <div className="flex-1 min-w-0">
                                        <ul className="space-y-3">
                                            {item.bulletPoints.map((point: string, i: number) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-3 text-sm text-[var(--color-textMuted)] leading-relaxed"
                                                >
                                                    <span className="mt-[7px] w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0 opacity-60" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-1.5 mt-6">
                                            {item.technologies.map((tech: string) => (
                                                <span key={tech} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>

                                        {/* Office photo strip for TG Levels */}
                                        {mounted && expImages && expImages.length > 0 && (
                                            <ExperiencePhotoStrip
                                                images={expImages}
                                                company={item.company}
                                                duration={item.duration}
                                            />
                                        )}

                                        {/* Internship certificates */}
                                        {mounted && internshipCerts.length > 0 && (
                                            <div className="mt-8 pt-6 border-t border-[var(--color-rule)]">
                                                <p className="mono-label flex items-center gap-2 mb-4">
                                                    <Award className="w-3 h-3 text-[var(--color-accent)]" />
                                                    Internship Certificates
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {internshipCerts.map((cert: InternshipCert, certIdx: number) => (
                                                        <InternshipCertCard
                                                            key={certIdx}
                                                            title={cert.title}
                                                            image={cert.image}
                                                            onOpen={openModal}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right — duration */}
                                    <div className="md:w-[140px] flex-shrink-0 md:text-right">
                                        <span className="mono-label whitespace-nowrap">{item.duration}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Education section */}
            {(higherEduEntries.length > 0 || schoolGroupEntry) && (
                <div className="max-w-[1320px] mx-auto px-6 md:px-10 mt-20 md:mt-28">
                    <div className="flex items-end justify-between border-b border-[var(--color-rule)] pb-6 mb-0">
                        <div>
                            <span className="mono-label text-[var(--color-accent)] block mb-3">02 / Education</span>
                            <h2 className="font-outfit font-bold text-[var(--color-textPrimary)] tracking-tight text-3xl md:text-4xl">
                                Academic<br />Foundation
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-0">
                        {higherEduEntries.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                variants={rowVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-60px' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 py-10 border-b border-[var(--color-rule)]">
                                    <div className="md:w-[280px] flex-shrink-0">
                                        <span className="mono-label text-[var(--color-textMuted)] block mb-3">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="font-outfit font-bold text-[var(--color-textPrimary)] text-xl md:text-2xl leading-tight tracking-tight mb-1">
                                            {item.degree}
                                        </h3>
                                        <p className="text-sm font-medium text-[var(--color-accent)]">
                                            {item.institution || item.description}
                                        </p>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {item.description && item.institution && (
                                            <p className="text-sm text-[var(--color-textMuted)] leading-relaxed">{item.description}</p>
                                        )}
                                        {item.achievements && item.achievements.length > 0 && (
                                            <ul className="space-y-2 mt-3">
                                                {item.achievements.map((a: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-textMuted)]">
                                                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0 opacity-60" />
                                                        {a}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="md:w-[140px] flex-shrink-0 md:text-right">
                                        <span className="mono-label whitespace-nowrap">{item.duration}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* School grouped entry */}
                        {schoolGroupEntry && Array.isArray(schoolGroupEntry.entries) && schoolGroupEntry.entries.length > 0 && (
                            <motion.div
                                variants={rowVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-60px' }}
                            >
                                <div className="py-10 border-b border-[var(--color-rule)]">
                                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-12">
                                        <div>
                                            <span className="mono-label text-[var(--color-textMuted)] block mb-3">
                                                {String(higherEduEntries.length + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="font-outfit font-bold text-[var(--color-textPrimary)] text-xl md:text-2xl leading-tight tracking-tight">
                                                {schoolGroupEntry.degree || 'School Education'}
                                            </h3>
                                        </div>
                                        <div className="space-y-2">
                                            {schoolGroupEntry.entries.map((entry, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between py-3 px-4 border border-[var(--color-border)] rounded-sm hover:border-[var(--color-textMuted)] transition-colors"
                                                >
                                                    <span className="text-sm font-medium text-[var(--color-textPrimary)]">{entry.level}</span>
                                                    <span className="mono-label">{entry.year}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}

            {/* Certifications Carousel */}
            <div className="mt-20 md:mt-28 max-w-[1320px] mx-auto px-6 md:px-10">
                <div className="flex items-center gap-6 mb-10 border-b border-[var(--color-rule)] pb-6">
                    <span className="mono-label text-[var(--color-accent)]">03 / Certifications</span>
                    <div className="flex-1" />
                    <Award className="w-4 h-4 text-[var(--color-textMuted)]" />
                </div>
                <CertCarousel onOpen={openModal} />
            </div>
        </Section>
    );
};
