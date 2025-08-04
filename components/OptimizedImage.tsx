'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Skeleton from './LoadingSkeleton';
import ErrorBoundary from './ErrorBoundary';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  skeletonClassName?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc,
  skeletonClassName = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  // Debug logging
  console.log(`OptimizedImage initialized with src: ${src}, alt: ${alt}`);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    console.warn(`Image failed to load: ${currentSrc}`);
    console.warn(`Original src: ${src}`);
    console.warn(`Fallback src: ${fallbackSrc}`);
    console.warn(`Retry count: ${retryCount}`);
    
    // Try fallback image if available and not already using it
    if (fallbackSrc && currentSrc !== fallbackSrc && !currentSrc.includes(fallbackSrc)) {
      console.info(`Attempting fallback image: ${fallbackSrc}`);
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
      setRetryCount(0); // Reset retry count for fallback
      return;
    }
    
    // Retry original image up to maxRetries times (but not for fallback images)
    if (retryCount < maxRetries && currentSrc === src) {
      console.info(`Retrying image load (attempt ${retryCount + 1}/${maxRetries}): ${src}`);
      setRetryCount(prev => prev + 1);
      setHasError(false);
      setIsLoading(true);
      // Force reload by adding timestamp
      setCurrentSrc(`${src}?retry=${Date.now()}`);
      return;
    }
    
    // Final failure
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Generate blur data URL for better loading experience
  const generateBlurDataURL = (w: number = 10, h: number = 10) => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f1f5f9"/>
        <rect width="100%" height="100%" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e2e8f0;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#cbd5e1;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>`
    ).toString('base64')}`;
  };

  const imageProps = {
    src: currentSrc,
    alt,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    priority,
    quality,
    onLoad: handleLoad,
    onError: handleError,
    placeholder: placeholder === 'blur' ? 'blur' as const : 'empty' as const,
    blurDataURL: blurDataURL || (placeholder === 'blur' ? generateBlurDataURL(width, height) : undefined),
    sizes: sizes || (fill ? '100vw' : undefined),
    ...(fill ? { fill: true } : { width, height })
  };

  return (
    <div className="relative">
      {/* Loading Skeleton */}
      {isLoading && (
        <div className={`absolute inset-0 z-10 ${skeletonClassName}`}>
          <Skeleton className="w-full h-full" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-brandColorBackground to-slate-200 flex items-center justify-center">
          <div className="text-center">
            <svg 
              className="w-12 h-12 mobile:w-16 mobile:h-16 text-brandColorSecondary mx-auto mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-xs text-brandColorSecondary">Image not available</p>
          </div>
        </div>
      )}

      {/* Optimized Image */}
      {!hasError && (
        <ErrorBoundary
          fallback={
            <div className="absolute inset-0 bg-gradient-to-br from-brandColorBackground to-slate-200 flex items-center justify-center">
              <div className="text-center">
                <svg 
                  className="w-12 h-12 mobile:w-16 mobile:h-16 text-brandColorSecondary mx-auto mb-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <p className="text-xs text-brandColorSecondary">Image configuration error</p>
              </div>
            </div>
          }
        >
          <Image {...imageProps} alt={alt} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default OptimizedImage;