import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ManifestoSection } from '@/components/sections/ManifestoSection';

import { FeaturedCapsule } from '@/components/sections/FeaturedCapsule';
import { ProjectIndex } from '@/components/sections/ProjectIndex';
import { EngineeringCapabilities } from '@/components/sections/EngineeringCapabilities';
import { TGLevelsStory } from '@/components/sections/TGLevelsStory';
import { ResearchPipeline } from '@/components/sections/ResearchPipeline';
import { AboutSection } from '@/components/sections/AboutSection';
import { AskWorkPanel } from '@/components/sections/AskWorkPanel';
import { ContactStatement } from '@/components/sections/ContactStatement';

export const metadata: Metadata = {
    title: 'Ankit Singh — Full Stack Engineer',
    description: 'Full Stack Engineer building production-grade systems across backend architecture, real-time infrastructure, distributed systems, and AI-powered services.',
};

export default function Home() {
    return (
        <main>
            {/* 01 — Navigation */}
            <Navbar />

            {/* 02 — Editorial Hero (PAPER) */}
            <Hero />

            {/* 03 — Engineering Manifesto (INK) */}
            <ManifestoSection />

            {/* 06 — Capsule Flagship (INK) */}
            <FeaturedCapsule />

            {/* 07 — Project Index (PAPER) */}
            <ProjectIndex />

            {/* 08 — Engineering Capabilities (SOFT) */}
            <EngineeringCapabilities />

            {/* 09 — TG Levels Engineering Story (PAPER) */}
            <TGLevelsStory />

            {/* 10 — MW/DW Research Pipeline (INK) */}
            <ResearchPipeline />

            {/* 11 — About (PAPER) */}
            <AboutSection />

            {/* 12 — Ask About The Work / AI (INK) */}
            <AskWorkPanel />

            {/* 13 — Contact (INK + ACID) */}
            <ContactStatement />

            {/* 14 — Footer (INK) */}
            <Footer />
        </main>
    );
}
