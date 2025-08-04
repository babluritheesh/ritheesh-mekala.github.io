'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production and if performance API is available
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return;
    }

    const metrics: PerformanceMetrics = {};

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            metrics.lcp = lastEntry.startTime;
            
            if (metrics.lcp && metrics.lcp > 2500) {
              console.warn('LCP is poor:', metrics.lcp);
            } else if (metrics.lcp && metrics.lcp > 1200) {
              console.info('LCP needs improvement:', metrics.lcp);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              metrics.fid = entry.processingStart - entry.startTime;
              
              if (metrics.fid && metrics.fid > 100) {
                console.warn('FID is poor:', metrics.fid);
              } else if (metrics.fid && metrics.fid > 25) {
                console.info('FID needs improvement:', metrics.fid);
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            
            metrics.cls = clsValue;
            
            if (metrics.cls && metrics.cls > 0.25) {
              console.warn('CLS is poor:', metrics.cls);
            } else if (metrics.cls && metrics.cls > 0.1) {
              console.info('CLS needs improvement:', metrics.cls);
            }
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // First Contentful Paint (FCP)
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.name === 'first-contentful-paint') {
                metrics.fcp = entry.startTime;
                
                if (metrics.fcp && metrics.fcp > 3000) {
                  console.warn('FCP is poor:', metrics.fcp);
                } else if (metrics.fcp && metrics.fcp > 1800) {
                  console.info('FCP needs improvement:', metrics.fcp);
                }
              }
            });
          });
          fcpObserver.observe({ entryTypes: ['paint'] });

        } catch (error) {
          console.error('Error setting up performance observers:', error);
        }
      }

      // Time to First Byte (TTFB)
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        metrics.ttfb = timing.responseStart - timing.navigationStart;
        
        if (metrics.ttfb && metrics.ttfb > 800) {
          console.warn('TTFB is poor:', metrics.ttfb);
        } else if (metrics.ttfb && metrics.ttfb > 200) {
          console.info('TTFB needs improvement:', metrics.ttfb);
        }
      }
    };

    // Measure resource loading performance
    const measureResourcePerformance = () => {
      if (window.performance && window.performance.getEntriesByType) {
        const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        const imageResources = resources.filter(resource => 
          resource.initiatorType === 'img' || 
          resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)
        );
        
        const slowImages = imageResources.filter(resource => 
          resource.duration > 1000
        );
        
        if (slowImages.length > 0) {
          console.warn('Slow loading images detected:', slowImages.map(img => ({
            url: img.name,
            duration: img.duration
          })));
        }

        // Check for unused resources
        const unusedResources = resources.filter(resource => 
          resource.transferSize === 0 && resource.decodedBodySize > 0
        );
        
        if (unusedResources.length > 0) {
          console.info('Potentially unused resources:', unusedResources.length);
        }
      }
    };

    // Run measurements after page load
    if (document.readyState === 'complete') {
      measureWebVitals();
      measureResourcePerformance();
    } else {
      window.addEventListener('load', () => {
        measureWebVitals();
        measureResourcePerformance();
      });
    }

    // Log final metrics after 5 seconds
    const metricsTimeout = setTimeout(() => {
      if (Object.keys(metrics).length > 0) {
        console.group('Performance Metrics');
        console.table(metrics);
        console.groupEnd();
      }
    }, 5000);

    return () => {
      clearTimeout(metricsTimeout);
    };
  }, []);

  return null;
};

export default PerformanceMonitor;