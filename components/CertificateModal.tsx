'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface CertificateModalProps {
    src: string;
    alt: string;
    onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ src, alt, onClose }) => {
    // Close on ESC key
    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        // Prevent body scroll while modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [handleKey]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate Preview"
        >
            {/* Close button */}
            <button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={onClose}
                aria-label="Close certificate preview"
            >
                <X className="w-5 h-5 text-white" />
            </button>

            {/* Hint */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs">
                Scroll to zoom · Drag to pan · Double-click to reset · ESC to close
            </p>

            {/* Modal content – stop click propagation so overlay click still works */}
            <div
                className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={5}
                    wheel={{ step: 0.2 }}
                    doubleClick={{ disabled: false }}
                    pinch={{ step: 5 }}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            {/* Zoom controls */}
                            <div className="absolute top-3 left-3 z-10 flex gap-2">
                                <button
                                    onClick={() => zoomIn()}
                                    className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
                                    aria-label="Zoom in"
                                >
                                    <ZoomIn className="w-4 h-4 text-white" />
                                </button>
                                <button
                                    onClick={() => zoomOut()}
                                    className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
                                    aria-label="Zoom out"
                                >
                                    <ZoomOut className="w-4 h-4 text-white" />
                                </button>
                                <button
                                    onClick={() => resetTransform()}
                                    className="w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
                                    aria-label="Reset zoom"
                                >
                                    <RotateCcw className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            <TransformComponent
                                wrapperStyle={{ maxWidth: '90vw', maxHeight: '85vh' }}
                                contentStyle={{ cursor: 'grab' }}
                            >
                                <Image
                                    src={src}
                                    alt={alt}
                                    width={900}
                                    height={600}
                                    className="rounded-lg select-none"
                                    draggable={false}
                                    priority
                                />
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>
        </div>
    );
};

export default CertificateModal;
