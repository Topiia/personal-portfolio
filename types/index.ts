// Core data types
export interface Profile {
    name: string;
    title: string;
    tagline: string;
    summary: string;
    email: string;
    location: string;
    focusAreas: string[];
    ctaButtons: CTAButton[];
}

export interface CTAButton {
    label: string;
    type: 'primary' | 'secondary' | 'accent';
    action: 'download' | 'link' | 'scroll';
    link: string;
}

export interface SkillCategory {
    name: string;
    title?: string;
    icon: string;
    skills: string[];
}

export interface Skills {
    categories: SkillCategory[];
}

export interface Project {
    id: string;
    title: string;
    impactStatement: string;
    description: string;
    problemSolved: string;
    architecture: string;
    techStack: string[];
    tags: string[];
    githubUrl: string;
    liveUrl: string;
    demoVideoUrl: string;
    images: string[];
    featured: boolean;
    complexityLevel: string;
    status: string;
    orderIndex: number;
    isFlagship?: boolean;
    architectureBreakdown?: {
        security: {
            title: string;
            items: string[];
        };
        async: {
            title: string;
            items: string[];
        };
        caching: {
            title: string;
            items: string[];
        };
        observability: {
            title: string;
            items: string[];
        };
        systemStructure: string[];
    };
    engineeringDecisions?: string[];
    productionReadiness?: {
        checked: string[];
        unchecked: string[];
    };
    scalability?: {
        badges: string[];
        description: string;
    };
    media?: {
        thumbnail: string;
    };
}

// Extended type after merging with generated media data
export interface ProjectWithMedia extends Project {
    media?: {
        thumbnail: string;
        videos: string[];
        images: string[];
    };
}

export interface Projects {
    projects: Project[];
}

export interface Experience {
    id: string;
    type: 'experience';
    role: string;
    company: string;
    duration: string;
    description: string;
    bulletPoints: string[];
    technologies: string[];
    orderIndex: number;
}

export interface Education {
    id: string;
    type: 'education';
    degree: string;
    institution?: string;
    duration?: string;
    grade?: string;
    description?: string;
    achievements?: string[];
    orderIndex: number;
    group?: string;
    entries?: {
        level: string;
        year: string;
        score?: string;
    }[];
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialUrl: string;
    icon: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
}

export interface Contact {
    email: string;
    phone: string;
    location: string;
    socialLinks: SocialLink[];
    availability: {
        status: string;
        message: string;
        calendarUrl: string;
    };
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    label: string;
}

export interface Navigation {
    logo: {
        text: string;
        full: string;
    };
    mainMenu: MenuItem[];
    ctaButtons: NavButton[];
}

export interface MenuItem {
    label: string;
    href: string;
    type: 'scroll' | 'link';
}

export interface NavButton {
    label: string;
    href: string;
    type: 'download' | 'link' | 'scroll';
    variant: 'outline' | 'icon' | 'primary';
    icon?: string;
}

export interface Theme {
    currentTheme: string;
    themes: {
        [key: string]: ThemeConfig;
    };
}

export interface ThemeConfig {
    name: string;
    colors: {
        background: string;
        surface: string;
        card: string;
        border: string;
        textMuted: string;
        textHeading: string;
        accent: string;
        accentHover: string;
    };
    spacing: {
        section: string;
        cardPadding: string;
        maxWidth: string;
    };
    borderRadius: {
        card: string;
        button: string;
    };
    shadows: {
        card: string;
        cardHover: string;
    };
    animation: {
        duration: {
            fast: string;
            normal: string;
            slow: string;
        };
        easing: string;
    };
}
