import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { Skills } from '@/components/sections/Skills';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';
import { BackgroundLogos } from '@/components/background/BackgroundLogos';
import { getFlagshipProjects, getNonFeaturedProjects } from '@/lib/data-loader';

export default function Home() {
    const flagshipProjects = getFlagshipProjects();
    const projects = getNonFeaturedProjects();

    return (
        <main className="min-h-screen">
            <BackgroundLogos />
            <Navbar />
            <Hero />
            <ProjectsGrid flagshipProjects={flagshipProjects} projects={projects} />
            <Skills />
            <ExperienceTimeline />
            <Services />
            <Contact />
            <Footer />
        </main>
    );
}
