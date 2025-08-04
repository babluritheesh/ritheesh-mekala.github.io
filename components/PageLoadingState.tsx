'use client';

import React from 'react';
import { HeroSectionSkeleton, ProjectCardSkeleton } from './LoadingSkeleton';

const PageLoadingState: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <HeroSectionSkeleton />
      
      {/* Projects Section Skeleton */}
      <section className="py-12 mobile:py-16 tablet:py-20 desktop:py-24 px-4 mobile:px-6 tablet:px-8 max-w-7xl mx-auto">
        {/* Section Header Skeleton */}
        <div className="text-center mb-8 mobile:mb-12 tablet:mb-16">
          <div className="animate-pulse">
            <div className="h-8 mobile:h-10 tablet:h-12 desktop:h-14 bg-gray-200 rounded-lg mx-auto mb-4 w-64 mobile:w-80"></div>
            <div className="h-4 mobile:h-5 tablet:h-6 bg-gray-200 rounded-lg mx-auto w-96 mobile:w-[500px] max-w-full"></div>
          </div>
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex flex-wrap justify-center gap-2 mobile:gap-3 mb-8 mobile:mb-12 tablet:mb-16">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse h-10 mobile:h-12 bg-gray-200 rounded-full"
              style={{ width: `${Math.random() * 60 + 80}px` }}
            />
          ))}
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 mobile:gap-8 tablet:gap-10 desktop:gap-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PageLoadingState;