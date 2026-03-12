import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_FILE = path.resolve(__dirname, '..', 'data', 'generated', 'project-media.json');
const MAP_FILE = path.resolve(__dirname, 'cloudinary-url-map.json');

interface ProjectMedia {
    [projectId: string]: {
        videos: string[];
        images: string[];
    };
}

function generateProjectMedia(): void {
    const result: ProjectMedia = {};

    let urlMap: Record<string, string> = {};
    if (fs.existsSync(MAP_FILE)) {
        urlMap = JSON.parse(fs.readFileSync(MAP_FILE, 'utf-8'));
    }

    // Ensure output directory exists safely
    const outputDir = path.dirname(OUTPUT_FILE);
    fs.mkdirSync(outputDir, { recursive: true });

    // Iterate through cloudinary mapped paths
    // e.g. "/public/images/projects/agile-almanac/videos/agile-almanac-video1.mp4"
    for (const [localPath, cloudinaryUrl] of Object.entries(urlMap)) {
        const match = localPath.match(/^\/public\/images\/projects\/([^/]+)\/(images|videos)\/.+$/);
        if (match) {
            const projectId = match[1];
            const type = match[2]; // 'images' or 'videos'
            
            if (!result[projectId]) {
                result[projectId] = { videos: [], images: [] };
            }
            
            result[projectId][type as 'images' | 'videos'].push(cloudinaryUrl);
        }
    }

    // Sort arrays for deterministic output
    for (const projectId in result) {
        result[projectId].videos.sort();
        result[projectId].images.sort();
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8');

    const projectCount = Object.keys(result).length;
    const totalMedia = Object.values(result).reduce(
        (sum, m) => sum + m.images.length + m.videos.length, 0
    );
    console.log(`[generateProjectMedia] Processed ${totalMedia} media files across ${projectCount} projects from Cloudinary map.`);
}

generateProjectMedia();
