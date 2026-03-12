import React from 'react';
import Link from 'next/link';
import { ProjectWithMedia } from '@/types';

interface ListProjectCardProps {
    project: ProjectWithMedia;
}

export const ListProjectCard: React.FC<ListProjectCardProps> = ({ project }) => {
    const videoUrl = project.demoVideoUrl || project.media?.videos?.[0];
    const imageUrl = project.media?.thumbnail || project.media?.images?.[0];

    const renderMedia = () => {
        if (videoUrl) {
            return (
                <video
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={project.media?.thumbnail}
                    className="w-full h-full object-cover rounded-xl"
                />
            );
        } else if (imageUrl) {
            return (
                <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                />
            );
        } else {
            return (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-surface to-accent/20 flex items-center justify-center p-6 text-center">
                    <span className="text-xl font-bold text-textHeading font-outfit">{project.title}</span>
                </div>
            );
        }
    };

    return (
        <Link href={`/projects/${project.id}`} className="block h-full group snap-start">
            <div className="h-full flex flex-col lg:flex-row bg-surface/20 border border-accent/20 rounded-2xl p-4 lg:p-5 transition-all duration-300 hover:bg-surface/40 hover:border-accent/40">
                
                {/* Image/Video Container */}
                <div className="w-full lg:w-2/5 aspect-video mb-4 lg:mb-0 lg:mr-6 lg:h-auto shrink-0">
                    {renderMedia()}
                </div>

                {/* Content Container */}
                <div className="w-full lg:w-3/5 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-textHeading font-outfit group-hover:text-accent transition-colors break-words">
                            {project.title}
                        </h3>
                        {/* Icons */}
                        <div className="flex gap-2 shrink-0 ml-4">
                            {project.githubUrl && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                                    }}
                                    className="text-textMuted/40 hover:text-accent transition-colors"
                                    aria-label="View Source on GitHub"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </button>
                            )}
                            {project.liveUrl && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                                    }}
                                    className="text-textMuted/40 hover:text-accent transition-colors"
                                    aria-label="View Live Demo"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <p className="text-textMuted text-sm sm:text-base mb-4 font-light leading-relaxed">
                        {project.impactStatement || project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.techStack?.slice(0, 5).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 bg-white/5 text-textMuted rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/5 group-hover:bg-accent/5 group-hover:text-accent transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                        {(project.techStack?.length || 0) > 5 && (
                            <span className="px-2 py-1 bg-white/5 text-textMuted rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/5">
                                +{(project.techStack?.length || 0) - 5}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};
