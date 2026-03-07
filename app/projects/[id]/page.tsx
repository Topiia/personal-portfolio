import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BackgroundLogos } from '@/components/background/BackgroundLogos';
import { getProjects, getProjectById } from '@/lib/data-loader';
import { ProjectDetailClient } from './ProjectDetailClient';

// Static generation: pre-render all project pages at build time
export function generateStaticParams() {
    const { projects } = getProjects();
    return projects.map((project) => ({
        id: project.id,
    }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
    const project = getProjectById(params.id);
    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} | Ankit Singh`,
        description: project.impactStatement,
    };
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const project = getProjectById(params.id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            <BackgroundLogos />
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link href="/#projects" className="text-textMuted hover:text-accent transition-colors text-sm">
                        ← Back to Projects
                    </Link>
                </nav>

                <ProjectDetailClient project={project} />
            </div>

            <Footer />
        </main>
    );
}
