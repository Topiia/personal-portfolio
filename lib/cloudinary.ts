const urlMap: Record<string, string> = 
  process.env.NODE_ENV === 'production' 
    ? require('../scripts/cloudinary-url-map.json')
    : {};

export function getMediaUrl(localPath: string): string {
  if (process.env.NODE_ENV === 'production' && urlMap[localPath]) {
    return urlMap[localPath];
  }
  return localPath;
}

export function getCloudinaryVideoUrl(url: string, options?: {
  quality?: 'auto' | number;
  format?: 'auto' | 'mp4' | 'webm';
}): string {
  if (!url.includes('cloudinary.com')) return url;
  
  const quality = options?.quality ?? 'auto';
  const format = options?.format ?? 'auto';
  
  return url.replace(
    '/upload/',
    `/upload/q_${quality},f_${format}/`
  );
}
