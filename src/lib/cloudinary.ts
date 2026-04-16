/**
 * Transforma URL Cloudinary pentru responsive + format modern
 */
export function cldImage(
  url: string | undefined,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg';
    crop?: 'fill' | 'fit' | 'scale';
  } = {}
): string {
  if (!url || !url.includes('res.cloudinary.com')) return url || '';
  
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options;
  
  const transformations: string[] = [];
  if (format) transformations.push(`f_${format}`);
  if (quality) transformations.push(`q_${quality}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);
  transformations.push('dpr_auto');
  
  const transformStr = transformations.join(',');
  return url.replace('/upload/', `/upload/${transformStr}/`);
}

/**
 * Generează srcSet pentru responsive images
 */
export function cldSrcSet(url: string | undefined, widths: number[] = [400, 800, 1200]): string {
  if (!url || !url.includes('res.cloudinary.com')) return '';
  return widths
    .map(w => `${cldImage(url, { width: w })} ${w}w`)
    .join(', ');
}
