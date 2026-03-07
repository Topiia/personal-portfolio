'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

interface ProjectCardMediaProps {
    videos: string[];
    images: string[];
    thumbnail: string;
    title: string;
}

export const ProjectCardMedia: React.FC<ProjectCardMediaProps> = ({
    videos,
    images,
    thumbnail,
    title,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const hasVideos = videos.length > 0;
    const hasImages = images.length > 0;
    const hasMedia = hasVideos || hasImages;

    // Auto-play/pause video on hover
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !hasVideos) return;

        if (isHovered) {
            video.play().catch(() => {});
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [isHovered, hasVideos]);

    // Image slideshow when only images exist (no videos)
    useEffect(() => {
        if (!hasVideos && hasImages && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 3000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [hasVideos, hasImages, images.length]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    // Fallback: no media at all
    if (!hasMedia && !thumbnail) {
        return (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-surface/30">
                <img
                    src="/images/project-placeholder.png"
                    alt={`${title} Preview`}
                    className="w-full h-full object-cover opacity-60"
                    loading="lazy"
                />
            </div>
        );
    }

    // Thumbnail-only fallback
    if (!hasMedia && thumbnail) {
        return (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-surface/30">
                <img
                    src={thumbnail}
                    alt={`${title} Preview`}
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                />
            </div>
        );
    }

    return (
        <div
            className="relative aspect-video rounded-xl overflow-hidden bg-surface/30 group/media"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ pointerEvents: 'auto' }}
        >
            {/* Video section */}
            {hasVideos && (
                <>
                    <video
                        ref={videoRef}
                        src={videos[0]}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                            isHovered ? 'scale-105' : 'scale-100'
                        }`}
                    />

                    {/* Play icon overlay — hidden on hover */}
                    {!isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                <svg
                                    className="w-5 h-5 text-white ml-0.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Image slideshow — only when no video exists */}
            {!hasVideos && hasImages && (
                <>
                    {images.map((img, i) => (
                        <img
                            key={img}
                            src={img}
                            alt={`${title} Screenshot ${i + 1}`}
                            loading="lazy"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                                i === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ))}

                    {/* Slideshow dots */}
                    {images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
                            {images.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                        i === currentImageIndex
                                            ? 'bg-accent w-4'
                                            : 'bg-white/30'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
    );
};
