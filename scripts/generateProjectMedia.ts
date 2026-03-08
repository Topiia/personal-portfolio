import * as fs from 'fs';
import * as path from 'path';

const SUPPORTED_IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const SUPPORTED_VIDEO_EXTS = new Set(['.mp4', '.webm']);

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public', 'images', 'projects');
const OUTPUT_FILE = path.resolve(__dirname, '..', 'data', 'generated', 'project-media.json');

interface ProjectMedia {
    [projectId: string]: {
        videos: string[];
        images: string[];
    };
}

function isValidMediaFile(fileName: string, supportedExts: Set<string>): boolean {
    if (fileName.startsWith('.')) return false; // hidden files, .gitkeep, .DS_Store
    const ext = path.extname(fileName).toLowerCase();
    return supportedExts.has(ext);
}

function scanDirectory(dirPath: string, supportedExts: Set<string>): string[] {
    if (!fs.existsSync(dirPath)) return [];

    return fs.readdirSync(dirPath)
        .filter((file) => isValidMediaFile(file, supportedExts))
        .sort() // deterministic alphabetical ordering
        .map((file) => {
            // Build the public-relative URL path
            const relativePath = path.relative(
                path.resolve(__dirname, '..', 'public'),
                path.join(dirPath, file)
            );
            return '/' + relativePath.replace(/\\/g, '/');
        });
}

function generateProjectMedia(): void {
    const result: ProjectMedia = {};

    // Ensure output and projects directory exist safely (no existsSync checks to avoid race conditions)
    const outputDir = path.dirname(OUTPUT_FILE);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });

    // Robust directory scanning
    const projectDirs = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
        .map((entry) => entry.name);

    for (const projectId of projectDirs.sort()) {
        const imagesDir = path.join(PUBLIC_DIR, projectId, 'images');
        const videosDir = path.join(PUBLIC_DIR, projectId, 'videos');

        const images = scanDirectory(imagesDir, SUPPORTED_IMAGE_EXTS);
        const videos = scanDirectory(videosDir, SUPPORTED_VIDEO_EXTS);

        // Only include projects that have at least one media file
        if (images.length > 0 || videos.length > 0) {
            result[projectId] = { videos, images };
        }
    }

    // Guaranteed file creation — always write even if empty
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8');

    const projectCount = Object.keys(result).length;
    const totalMedia = Object.values(result).reduce(
        (sum, m) => sum + m.images.length + m.videos.length, 0
    );
    console.log(`[generateProjectMedia] Discovered ${totalMedia} media files across ${projectCount} projects.`);
}

generateProjectMedia();
