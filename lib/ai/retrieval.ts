import profileData from '@/data/profile.json';
import skillsData from '@/data/skills.json';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import projectsData from '@/data/projects.json';
import capsuleData from '@/data/projects/capsule.json';

export interface SearchDocument {
    id: string;
    type: string;
    title: string;
    tags: string[];
    content: string;
}

export interface ScoredDocument {
    doc: SearchDocument;
    score: number;
}

const STOP_WORDS = new Set([
    'what', 'is', 'the', 'a', 'an', 'about', 'tell', 'me', 'your', 'do',
    'did', 'you', 'have', 'has', 'how', 'who', 'where', 'when', 'why',
    'can', 'could', 'would', 'should', 'i', 'in', 'on', 'at', 'to', 'of',
    'for', 'with', 'by', 'from', 'and', 'or', 'but', 'not', 'this', 'that',
    'it', 'its', 'are', 'was', 'were', 'be', 'been', 'being', 'will', 'my',
    'their', 'his', 'her', 'our', 'any', 'some', 'more',
    'give', 'list', 'show', 'describe', 'explain', 'get',
]);

function levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function fuzzyMatch(token: string, target: string): boolean {
    if (target.includes(token)) return true;
    // Allow 1 edit for short words (4-6 chars), 2 edits for longer words
    const maxDistance = token.length <= 6 ? 1 : 2;
    return levenshteinDistance(token, target) <= maxDistance;
}

const MAX_CONTEXT_CHARS = 6000;
const MIN_RELEVANCE_SCORE = 2;

// Module-level cache – safe to mutate in Edge Runtime (unlike globalThis)
let cachedIndex: SearchDocument[] | null = null;

function buildSearchIndex(): SearchDocument[] {
    const docs: SearchDocument[] = [];

    // Profile
    docs.push({
        id: 'profile',
        type: 'profile',
        title: profileData.name,
        tags: profileData.focusAreas ?? [],
        content: `${profileData.title}. ${profileData.tagline}. ${profileData.summary}. Location: ${profileData.location}.`,
    });

    // Skills
    if (skillsData.categories) {
        for (const cat of skillsData.categories) {
            docs.push({
                id: `skill-${cat.name}`,
                type: 'skill',
                title: cat.name,
                tags: cat.skills,
                content: `Skills in ${cat.name}: ${cat.skills.join(', ')}.`,
            });
        }
    }

    // Experience
    if ((experienceData as { experiences?: unknown[] }).experiences) {
        for (const exp of (experienceData as { experiences: { id: string; role: string; company: string; description: string; technologies?: string[]; bulletPoints?: string[] }[] }).experiences) {
            docs.push({
                id: exp.id,
                type: 'experience',
                title: `${exp.role} at ${exp.company}`,
                tags: exp.technologies ?? [],
                content: `${exp.description} ${(exp.bulletPoints ?? []).join('. ')}`,
            });
        }
    }

    // Education
    if ((educationData as { education?: unknown[] }).education) {
        for (const edu of (educationData as { education: { id: string; degree: string; institution?: string; description: string }[] }).education) {
            docs.push({
                id: edu.id,
                type: 'education',
                title: edu.degree,
                tags: [],
                content: `${edu.degree}${edu.institution ? ' at ' + edu.institution : ''}. ${edu.description}`,
            });
        }
    }

    // Capsule – flagship project stored in its own deep-detail file
    docs.push({
        id: capsuleData.id,
        type: 'project',
        title: capsuleData.title,
        tags: [
            ...(capsuleData.techStack ?? []),
            ...(capsuleData.tags ?? []),
        ],
        content: `${capsuleData.impactStatement}. ${capsuleData.description} Problem solved: ${capsuleData.problemSolved}`,
    });

    // Secondary projects (data/projects.json)
    const projects = Array.isArray(projectsData) ? projectsData : (projectsData as { projects?: unknown[] }).projects ?? [];
    for (const proj of projects as { id: string; title: string; description: string; techStack?: string[]; tags?: string[] }[]) {
        docs.push({
            id: proj.id,
            type: 'project',
            title: proj.title,
            tags: [...(proj.techStack ?? []), ...(proj.tags ?? [])],
            content: proj.description,
        });
    }

    return docs;
}

export function getSearchIndex(): SearchDocument[] {
    if (!cachedIndex) {
        cachedIndex = buildSearchIndex();
    }
    return cachedIndex;
}

export function tokenizeQuery(query: string): string[] {
    return query
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

export function scoreDocuments(query: string, tokens: string[], index: SearchDocument[]): ScoredDocument[] {
    const q = query.toLowerCase();

    const isProjectIntent = [
        'project', 'projects', 'build', 'built', 'created', 'work',
        'portfolio', 'developed', 'made', 'app', 'application', 'system'
    ].some(w => q.includes(w));

    const isExperienceIntent = [
        'experience', 'internship', 'intern', 'work experience', 'career',
        'job', 'worked', 'company', 'role', 'position', 'employment'
    ].some(w => q.includes(w));

    const isSkillIntent = [
        'skills', 'technologies', 'tech stack', 'tools', 'know', 'knowing',
        'perfect', 'best at', 'good at', 'expert', 'specialize', 'proficient',
        'strong', 'strength', 'capable', 'language', 'framework'
    ].some(w => q.includes(w));

    const isProfileIntent = [
        'about you', 'about yourself', 'who are you', 'introduction', 'yourself',
        'tell me about', 'overview', 'summary', 'background', 'bio', 'profile',
        'certificates', 'certification', 'achievements', 'education', 'degree',
        'qualified', 'qualification', 'what do you do', 'services', 'offer',
        'impress', 'different', 'unique', 'stand out', 'special', 'why hire',
        'why you', 'convince me', 'sell yourself', 'pitch', 'wow',
        'hire', 'available', 'availability', 'freelance', 'contract', 'build me',
        'make me', 'create for me', 'need a website', 'need an app', 'need a developer',
        'charge', 'cost', 'price', 'pricing', 'rate', 'fee', 'quote',
        'help me build', 'work with me', 'collaborate'
    ].some(w => q.includes(w));

    return index
        .map(doc => {
            let score = 0;
            const titleLower = doc.title.toLowerCase();
            const contentLower = doc.content.toLowerCase();
            const tagsLower = doc.tags.map(t => t.toLowerCase());

            for (const token of tokens) {
                // Exact matches score higher than fuzzy matches
                if (titleLower.includes(token)) {
                    score += 5;
                } else if (fuzzyMatch(token, titleLower)) {
                    score += 3; // fuzzy title match, slightly lower confidence
                }

                if (tagsLower.some(tag => tag.includes(token))) {
                    score += 3;
                } else if (tagsLower.some(tag => fuzzyMatch(token, tag))) {
                    score += 2; // fuzzy tag match
                }

                if (contentLower.includes(token)) {
                    score += 1;
                } else if (fuzzyMatch(token, contentLower)) {
                    score += 1; // same score, content fuzzy
                }
            }

            // Intent boosting
            if (isProjectIntent && doc.type === 'project') {
                score += (doc.id === 'capsule' ? 5 : 3); // Flagship priority
            }
            if (isExperienceIntent && doc.type === 'experience') score += 3;
            if (isSkillIntent && doc.type === 'skill') score += 3;
            if (isProfileIntent) {
                if (doc.type === 'profile') score += 5;
                else if (doc.id === 'capsule') score += 4;
                else if (doc.type === 'skill') score += 3;
            }

            return { doc, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score);
}

export function selectRelevantDocuments(scoredDocs: ScoredDocument[]): { docs: SearchDocument[]; maxScore: number } {
    if (scoredDocs.length === 0) return { docs: [], maxScore: 0 };

    const maxScore = scoredDocs[0].score;
    const selected: SearchDocument[] = [];
    let totalChars = 0;

    for (const { doc } of scoredDocs) {
        const docStr = formatSingleDocument(doc);
        if (totalChars + docStr.length > MAX_CONTEXT_CHARS) break;
        selected.push(doc);
        totalChars += docStr.length;
    }

    return { docs: selected, maxScore };
}

function formatSingleDocument(doc: SearchDocument): string {
    const typeLabel = doc.type.charAt(0).toUpperCase() + doc.type.slice(1);
    const tagsLine = doc.tags.length > 0 ? `Technologies/Skills: ${doc.tags.join(', ')}\n` : '';
    return `${typeLabel}: ${doc.title}\n${tagsLine}Details: ${doc.content}\n---\n`;
}

export function formatContext(docs: SearchDocument[]): string {
    if (docs.length === 0) return '';
    const body = docs.map(formatSingleDocument).join('\n');
    return `<PortfolioContext>\n${body}\n</PortfolioContext>`;
}

export function runRetrieval(query: string): { context: string; shouldFallback: boolean } {
    const tokens = tokenizeQuery(query);
    const q = query.toLowerCase();

    const isProjectIntent = [
        'project', 'projects', 'build', 'built', 'created', 'work',
        'portfolio', 'developed', 'made', 'app', 'application', 'system'
    ].some(w => q.includes(w));

    const isExperienceIntent = [
        'experience', 'internship', 'intern', 'work experience', 'career',
        'job', 'worked', 'company', 'role', 'position', 'employment'
    ].some(w => q.includes(w));

    const isSkillIntent = [
        'skills', 'technologies', 'tech stack', 'tools', 'know', 'knowing',
        'perfect', 'best at', 'good at', 'expert', 'specialize', 'proficient',
        'strong', 'strength', 'capable', 'language', 'framework'
    ].some(w => q.includes(w));

    const isProfileIntent = [
        'about you', 'about yourself', 'who are you', 'introduction', 'yourself',
        'tell me about', 'overview', 'summary', 'background', 'bio', 'profile',
        'certificates', 'certification', 'achievements', 'education', 'degree',
        'qualified', 'qualification', 'what do you do', 'services', 'offer',
        'impress', 'different', 'unique', 'stand out', 'special', 'why hire',
        'why you', 'convince me', 'sell yourself', 'pitch', 'wow',
        'hire', 'available', 'availability', 'freelance', 'contract', 'build me',
        'make me', 'create for me', 'need a website', 'need an app', 'need a developer',
        'charge', 'cost', 'price', 'pricing', 'rate', 'fee', 'quote',
        'help me build', 'work with me', 'collaborate'
    ].some(w => q.includes(w));

    const hasIntent = isProjectIntent || isExperienceIntent || isSkillIntent || isProfileIntent;

    if (tokens.length === 0 && !hasIntent) return { context: '', shouldFallback: true };

    const index = getSearchIndex();
    const scored = scoreDocuments(query, tokens, index);
    const { docs, maxScore } = selectRelevantDocuments(scored);

    if (maxScore < MIN_RELEVANCE_SCORE || docs.length === 0) {
        return { context: '', shouldFallback: true };
    }

    return { context: formatContext(docs), shouldFallback: false };
}
