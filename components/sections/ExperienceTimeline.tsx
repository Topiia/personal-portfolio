'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getTimeline, getCertifications, getInternshipCertificates } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import {
    Briefcase,
    GraduationCap,
    Award,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ImageOff,
} from 'lucide-react';

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
   Certificate Thumbnail Card (no zoom – opens modal on click)
───────────────────────────────────────────────────────────── */
interface CertCardProps {
    title: string;
    image: string;
    isActive: boolean;
    isPrev: boolean;
    isNext: boolean;
    onOpen: (src: string, alt: string) => void;
}

const CertCard: React.FC<CertCardProps> = React.memo(({ title, image, isActive, isPrev, isNext, onOpen }) => {
    const [imgError, setImgError] = useState(false);

    let rotateStyle: React.CSSProperties;
    let opacityClass: string;

    if (isActive) {
        rotateStyle = { transform: 'scale(1) rotateY(0deg)' };
        opacityClass = 'opacity-100 z-10';
    } else if (isPrev) {
        rotateStyle = { transform: 'scale(0.88) rotateY(6deg)' };
        opacityClass = 'opacity-65 z-0';
    } else if (isNext) {
        rotateStyle = { transform: 'scale(0.88) rotateY(-6deg)' };
        opacityClass = 'opacity-65 z-0';
    } else {
        rotateStyle = { transform: 'scale(0.85) rotateY(0deg)' };
        opacityClass = 'opacity-40 z-0';
    }

    return (
        <div
            className="cert-carousel-slide flex-none w-[220px] sm:w-[260px] md:w-[300px] px-2 transition-all duration-300 ease-out"
            style={{ perspective: '1200px' }}
        >
            <div
                className={`cert-card group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-transform duration-500 will-change-transform cursor-pointer hover:border-accent/40 ${opacityClass}`}
                style={{ ...rotateStyle, transformStyle: 'preserve-3d' }}
                onClick={() => !imgError && onOpen(image, `${title} Certificate`)}
                aria-label={`View ${title} Certificate`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && !imgError && onOpen(image, `${title} Certificate`)}
            >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-background/50">
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
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-textMuted bg-gradient-to-br from-accent/10 to-accent/5">
                            <ImageOff className="w-8 h-8 opacity-40" />
                            <span className="text-xs opacity-40 text-center px-4">
                                Missing image<br />
                                <code className="text-accent/60 truncate max-w-full block px-2">{image}</code>
                            </span>
                        </div>
                    )}

                    {/* Hover zoom hint */}
                    {!imgError && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full border border-white/20">
                                Click to view
                            </span>
                        </div>
                    )}

                    {/* Gradient + title overlay */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="pointer-events-none absolute bottom-3 left-3 right-3 text-white text-sm font-semibold truncate drop-shadow-md">
                        {title}
                    </span>
                </div>
            </div>
        </div>
    );
});
CertCard.displayName = 'CertCard';

/* ─────────────────────────────────────────────────────────────
   Embla Carousel – Infinite Auto-Scroll
───────────────────────────────────────────────────────────── */
const CertCarousel: React.FC<{ onOpen: (src: string, alt: string) => void }> = React.memo(({ onOpen }) => {
    const [mounted, setMounted] = useState(false);
    const { certifications } = getCertifications();

    const autoplay = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        mounted ? { loop: true, align: 'center', dragFree: true, skipSnaps: false } : undefined,
        mounted ? [autoplay.current] : []
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => { setMounted(true); }, []);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
            else if (e.key === 'ArrowRight') emblaApi?.scrollNext();
        },
        [emblaApi]
    );

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const certs = React.useMemo(() => certifications.map(c => ({
        id: c.id,
        title: (c as any).title || c.name,
        image: (c as any).image || ''
    })), [certifications]);

    // Skeleton before mount
    if (!mounted) {
        return (
            <div className="overflow-hidden py-8">
                <div className="flex justify-center gap-6">
                    {certs.map(c => (
                        <div key={c.id} className="flex-none w-[260px] h-[195px] rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className="cert-carousel-root relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Certificate Gallery"
        >
            {/* Fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-20 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-20 bg-gradient-to-l from-background to-transparent" />

            <div ref={emblaRef} className="overflow-hidden py-8">
                <div className="flex items-center will-change-transform">
                    {certs.map((cert, index) => {
                        const total = certs.length;
                        return (
                            <CertCard
                                key={cert.id}
                                title={cert.title}
                                image={cert.image}
                                isActive={index === selectedIndex}
                                isPrev={index === (selectedIndex - 1 + total) % total}
                                isNext={index === (selectedIndex + 1) % total}
                                onOpen={onOpen}
                            />
                        );
                    })}
                </div>
            </div>

            <button
                onClick={scrollPrev}
                aria-label="Previous certificate"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-surface/90 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all shadow-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
                <ChevronLeft className="w-5 h-5 text-textMuted group-hover:text-white" />
            </button>
            <button
                onClick={scrollNext}
                aria-label="Next certificate"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-surface/90 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all shadow-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
                <ChevronRight className="w-5 h-5 text-textMuted group-hover:text-white" />
            </button>
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
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-md hover:shadow-accent/20 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer"
            onClick={() => !imgError && onOpen(image, title)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && !imgError && onOpen(image, title)}
            aria-label={`View ${title}`}
        >
            <div className="relative w-full aspect-[4/3] bg-background/50 overflow-hidden">
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
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full border border-white/20">
                                Click to view
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-textMuted bg-gradient-to-br from-accent/10 to-accent/5">
                        <ImageOff className="w-8 h-8 opacity-40" />
                        <span className="text-xs opacity-40 text-center px-4">
                            Missing image<br />
                            <code className="text-accent/60 truncate block px-2">{image}</code>
                        </span>
                    </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="px-4 py-3 bg-surface/30">
                <p className="text-sm font-semibold text-textHeading line-clamp-1">{title}</p>
                <p className="text-xs text-textMuted mt-0.5">Internship Record</p>
            </div>
        </div>
    );
});
InternshipCertCard.displayName = 'InternshipCertCard';

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
    const orderedItems = [...experienceEntries, ...higherEduEntries];

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <Section id="experience" className="py-32">
            {/* Certificate preview modal */}
            {mounted && modalImage && (
                <CertificateModal src={modalImage.src} alt={modalImage.alt} onClose={closeModal} />
            )}

            {/* Section header */}
            <div className="text-center mb-24">
                <span className="text-accent font-semibold tracking-widest text-xs uppercase mb-4 block">
                    Trajectory
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-outfit text-textHeading">
                    Experience &amp; Education
                </h2>
                <p className="text-xl text-textMuted max-w-2xl mx-auto font-light">
                    The professional path and academic foundation
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <div className="space-y-12">
                    {orderedItems.map((item) => {
                        const companyId = item.id.split('-')[0];
                        const internshipCerts = internshipCertsMap?.[companyId] || [];

                        return (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                            >
                                <Card
                                    className="relative overflow-hidden p-8 md:p-10 premium-border bg-surface/10 glass-effect group"
                                    hoverEffect={true}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-accent/10">
                                                    {item.type === 'experience' ? (
                                                        <Briefcase className="w-5 h-5 text-accent" />
                                                    ) : (
                                                        <GraduationCap className="w-5 h-5 text-accent" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold uppercase tracking-widest text-accent/80">
                                                    {item.type === 'experience' ? 'Professional' : 'Academic'}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-textHeading font-outfit">
                                                    {item.type === 'experience' ? item.role : item.degree}
                                                </h3>
                                                <p className="text-xl text-textMuted font-medium mt-1">
                                                    {item.type === 'experience' ? item.company : (item.institution || item.description)}
                                                </p>
                                            </div>
                                            {item.type === 'experience' && (
                                                <ul className="space-y-3 pt-2">
                                                    {item.bulletPoints.map((point: string, i: number) => (
                                                        <li key={i} className="text-base text-textMuted font-light leading-relaxed flex items-start gap-3">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 flex-shrink-0" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div className="flex flex-col md:items-end gap-3 flex-shrink-0">
                                            <div className="flex items-center gap-2 text-textMuted text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                                <Calendar className="w-4 h-4" />
                                                {item.duration}
                                            </div>
                                        </div>
                                    </div>

                                    {item.type === 'experience' && (
                                        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/5">
                                            {item.technologies.map((tech: string) => (
                                                <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-accent/5 text-accent/70 rounded border border-accent/10">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {mounted && item.type === 'experience' && internshipCerts.length > 0 && (
                                        <div className="mt-10 pt-8 border-t border-white/5">
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-accent/80 mb-5 flex items-center gap-2">
                                                <Award className="w-4 h-4" />
                                                Internship Certificates
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {internshipCerts.map((cert: InternshipCert, idx: number) => (
                                                    <InternshipCertCard key={idx} title={cert.title} image={cert.image} onOpen={openModal} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        );
                    })}

                    {/* School Education grouped card */}
                    {schoolGroupEntry && Array.isArray(schoolGroupEntry.entries) && schoolGroupEntry.entries.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                        >
                            <Card
                                className="relative overflow-hidden p-8 md:p-10 premium-border bg-surface/10 glass-effect group"
                                hoverEffect={true}
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent/10">
                                                <GraduationCap className="w-5 h-5 text-accent" />
                                            </div>
                                            <span className="text-sm font-bold uppercase tracking-widest text-accent/80">Academic</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-textHeading font-outfit">
                                            {schoolGroupEntry.degree || 'School Education'}
                                        </h3>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {schoolGroupEntry.entries.map((entry, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 px-5 rounded-xl bg-white/5 border border-white/5 hover:border-accent/20 transition-colors"
                                        >
                                            <p className="text-base font-semibold text-textHeading">{entry.level}</p>
                                            <div className="flex items-center gap-1.5 text-textMuted text-xs font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                                <Calendar className="w-3 h-3" />
                                                {entry.year}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Certifications Carousel */}
            <div className="mt-32 max-w-5xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px bg-white/10 flex-1" />
                    <h3 className="text-2xl font-bold font-outfit text-textHeading flex items-center gap-3">
                        <Award className="w-6 h-6 text-accent" />
                        Certifications Gallery
                    </h3>
                    <div className="h-px bg-white/10 flex-1" />
                </div>
                <CertCarousel onOpen={openModal} />
            </div>
        </Section>
    );
};
