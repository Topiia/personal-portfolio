'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getContact } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

export const Contact = () => {
    const contact = getContact();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <Section id="contact" className="py-16 sm:py-24 md:py-32">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 px-4">
                <span className="text-accent font-semibold tracking-widest text-xs uppercase mb-4 block">
                    Collaboration
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-outfit text-textHeading">Get In Touch</h2>
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <p className="text-base sm:text-lg md:text-xl text-textMuted max-w-xl mx-auto font-light leading-relaxed">
                        Interested in building production-grade systems? Let&apos;s talk about your next project.
                    </p>
                    <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-accent text-[10px] font-bold uppercase tracking-widest leading-none">
                            {contact.availability.status}
                        </span>
                    </div>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                {/* Email */}
                <motion.div variants={itemVariants}>
                    <a href={`mailto:${contact.email}`}>
                        <Card className="text-center hover:border-accent/50 transition-all duration-200 hover:scale-[1.05] cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accentHover flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-textHeading mb-2">Email</h3>
                            <p className="text-textMuted text-sm break-all">{contact.email}</p>
                        </Card>
                    </a>
                </motion.div>

                {/* Social Links */}
                {contact.socialLinks.map((social) => (
                    <motion.div key={social.platform} variants={itemVariants}>
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <Card className="text-center hover:border-accent/50 transition-all duration-200 hover:scale-[1.05] cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accentHover flex items-center justify-center mx-auto mb-4">
                                    {social.platform === 'GitHub' && (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    )}
                                    {social.platform === 'LinkedIn' && (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    )}
                                    {social.platform === 'YouTube' && (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    )}
                                </div>
                                <h3 className="font-semibold text-textHeading mb-2">{social.platform}</h3>
                                <p className="text-textMuted text-sm">{social.label}</p>
                            </Card>
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};
