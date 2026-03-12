import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const url = process.env.CLOUDINARY_URL || '';
const match = url.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
if (match) {
  cloudinary.config({
    api_key: match[1],
    api_secret: match[2],
    cloud_name: match[3],
  });
} else {
  console.error('CLOUDINARY_URL not found or invalid format');
}

const MEDIA_DIRS = [
  'public/images',
  'public/videos',
  'public/certificates',
  'public/internships',
];

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.avi'];

async function uploadFile(filePath: string): Promise<{ localPath: string; cloudinaryUrl: string }> {
  const ext = path.extname(filePath).toLowerCase();
  const isVideo = ['.mp4', '.mov', '.avi'].includes(ext);
  
  const relativePath = filePath.replace('public/', '').replace(/\\/g, '/');
  const publicId = relativePath.replace(/\.[^/.]+$/, '').replace(/\//g, '/');

  const result = await cloudinary.uploader.upload(filePath, {
    public_id: `portfolio/${publicId}`,
    resource_type: isVideo ? 'video' : 'image',
    overwrite: false,
  });

  return {
    localPath: '/' + relativePath,
    cloudinaryUrl: result.secure_url,
  };
}

async function uploadAllMedia() {
  const urlMap: Record<string, string> = {};

  for (const dir of MEDIA_DIRS) {
    if (!fs.existsSync(dir)) continue;
    
    // Windows compliant directory search
    const walkSync = (d: string, fileList: string[] = []) => {
      const files = fs.readdirSync(d);
      for (const file of files) {
        const fullPath = path.join(d, file);
        if (fs.statSync(fullPath).isDirectory()) {
          fileList = walkSync(fullPath, fileList);
        } else {
          fileList.push(fullPath);
        }
      }
      return fileList;
    };
    
    const files = walkSync(dir);
    
    for (const file of files) {
      if (!fs.statSync(file).isFile()) continue;
      
      const ext = path.extname(file).toLowerCase();
      if (!SUPPORTED_EXTENSIONS.includes(ext)) continue;

      console.log(`Uploading: ${file}`);
      try {
        const { localPath, cloudinaryUrl } = await uploadFile(file);
        
        // Ensure keys use forward slashes even on Windows
        const normalizedLocalPath = localPath.replace(/\\/g, '/');
        
        urlMap[normalizedLocalPath] = cloudinaryUrl;
        console.log(`✅ ${normalizedLocalPath} → ${cloudinaryUrl}`);
      } catch (err) {
        console.error(`❌ Failed: ${file}`, err);
      }
    }
  }

  fs.writeFileSync(
    'scripts/cloudinary-url-map.json',
    JSON.stringify(urlMap, null, 2)
  );

  console.log('\n✅ URL map saved to scripts/cloudinary-url-map.json');
  console.log(`Total uploaded: ${Object.keys(urlMap).length} files`);
}

uploadAllMedia();
