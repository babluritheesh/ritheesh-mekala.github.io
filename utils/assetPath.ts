/**
 * Utility function to handle asset paths correctly for both development and production
 * Takes into account the basePath configured in next.config.js for GitHub Pages deployment
 */

/**
 * Get the correct asset path for the current environment
 * In development: returns the path as-is
 * In production: prepends the basePath for GitHub Pages
 */
export function getAssetPath(path: string): string {
  // In development, just return the path as-is
  if (process.env.NODE_ENV !== 'production') {
    return path;
  }
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production, we need to prepend the basePath for GitHub Pages
  const basePath = '/ritheesh-mekala.github.io';
  return `${basePath}/${cleanPath}`;
}

/**
 * Get the correct asset URL for images and other static assets
 * This ensures compatibility with GitHub Pages deployment
 */
export function getImagePath(imagePath: string): string {
  return getAssetPath(imagePath);
}

/**
 * Helper to get the current base path
 */
export function getBasePath(): string {
  return process.env.NODE_ENV === 'production' ? '/ritheesh-mekala.github.io' : '';
}