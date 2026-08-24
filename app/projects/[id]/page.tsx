import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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
        <main className="min-h-screen bg-paper">
            <Navbar />

            <div className="editorial-container pt-28 pb-20">
                {/* Breadcrumb */}
                <nav className="mb-10" aria-label="Breadcrumb">
                    <Link
                        href="/#work"
                        className="text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-[rgba(21,21,21,0.38)] hover:text-ink transition-colors duration-200"
                    >
                        ← Back to work
                    </Link>
                </nav>

                <ProjectDetailClient project={project} />
            </div>

            <Footer />
        </main>
    );
}
