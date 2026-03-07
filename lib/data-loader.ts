import profileData from '@/data/profile.json';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import certificationsData from '@/data/certifications.json';
import servicesData from '@/data/services.json';
import contactData from '@/data/contact.json';
import navigationData from '@/data/navigation.json';
import themeData from '@/data/theme.json';
import capsuleData from '@/data/projects/capsule.json';
import generatedMedia from '@/data/generated/project-media.json';

import type {
    Profile,
    Skills,
    Project,
    Projects,
    ProjectWithMedia,
    Experience,
    Education,
    Certification,
    Service,
    Contact,
    Navigation,
    Theme,
} from '@/types';

// Type for generated media mapping
type GeneratedMediaMap = Record<string, { videos: string[]; images: string[] }>;

const mediaMap: GeneratedMediaMap = generatedMedia as GeneratedMediaMap;

// Merge a project with its discovered media (safe defaults)
function mergeWithMedia(project: Project): ProjectWithMedia {
    const discovered = mediaMap[project.id];
    return {
        ...project,
        media: {
            thumbnail: project.media?.thumbnail || '',
            videos: discovered?.videos || [],
            images: discovered?.images || [],
        },
    };
}

export const getProfile = (): Profile => profileData as Profile;
export const getSkills = (): Skills => skillsData as Skills;

export const getProjects = (): { projects: ProjectWithMedia[] } => {
    const capsuleProject = capsuleData as Project;
    const allProjects = [capsuleProject, ...projectsData.projects] as Project[];
    return { projects: allProjects.map(mergeWithMedia) };
};

export const getProjectById = (id: string): ProjectWithMedia | undefined => {
    const { projects } = getProjects();
    return projects.find(p => p.id === id);
};

export const getExperiences = (): { experiences: Experience[] } => experienceData as { experiences: Experience[] };
export const getEducation = (): { education: Education[] } => educationData as { education: Education[] };
export const getCertifications = (): { certifications: Certification[] } => certificationsData as { certifications: Certification[] };
export const getServices = (): { services: Service[] } => servicesData as { services: Service[] };
export const getContact = (): Contact => contactData as Contact;
export const getNavigation = (): Navigation => navigationData as Navigation;
export const getTheme = (): any => themeData;

// Get featured project (flagships)
export const getFlagshipProjects = (): ProjectWithMedia[] => {
    const { projects } = getProjects();
    const flagships = projects.filter(p => p.isFlagship);

    // Fallback: If no flagships defined, try to use 'featured'
    if (flagships.length === 0) {
        const featured = projects.find(p => p.featured);
        return featured ? [featured] : [projects[0]];
    }

    return flagships;
};

// Get non-featured projects sorted by orderIndex
export const getNonFeaturedProjects = (): ProjectWithMedia[] => {
    const { projects } = getProjects();
    return projects
        .filter(p => !p.featured && !p.isFlagship)
        .sort((a, b) => a.orderIndex - b.orderIndex);
};

// Get combined timeline (experience + education) sorted by date
export const getTimeline = () => {
    const { experiences } = getExperiences();
    const { education } = getEducation();

    return [...experiences, ...education]
        .sort((a, b) => a.orderIndex - b.orderIndex);
};
