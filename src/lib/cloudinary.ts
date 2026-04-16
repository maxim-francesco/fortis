/**
 * Formats a Cloudinary URL to include dynamic optimizations for size and format.
 * If the URL is not a Cloudinary URL, it returns the original URL.
 * 
 * @param url The original image URL
 * @param width The target width in pixels (e.g., 600, 800)
 */
export function cldImage(url: string, width: number = 800): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com")) return url;
  
  // Example Cloudinary URL:
  // https://res.cloudinary.com/demo/image/upload/v1512569594/sample.jpg
  // Transform to:
  // https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/v1512569594/sample.jpg

  if (url.includes("/upload/v")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  
  // If it doesn't match the standard versioned format, just append to upload
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
