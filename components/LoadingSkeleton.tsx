'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
      default:
        return 'rounded-lg';
    }
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%')
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()} mb-2 last:mb-0`}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : '100%'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={style}
    />
  );
};

// Project Card Skeleton
export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="relative h-40 mobile:h-48 tablet:h-52 desktop:h-56 flex-shrink-0">
        <Skeleton className="w-full h-full" />
        {/* Category and Level badges */}
        <div className="absolute top-3 mobile:top-4 right-3 mobile:right-4 flex flex-col gap-1 mobile:gap-2">
          <Skeleton width={60} height={24} className="rounded-md" />
          <Skeleton width={70} height={24} className="rounded-md" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 mobile:p-6 flex-1 flex flex-col">
        {/* Title and Date */}
        <div className="flex justify-between items-start mb-2 mobile:mb-3">
          <Skeleton variant="text" width="70%" height={24} />
          <Skeleton variant="text" width={60} height={16} />
        </div>

        {/* Description */}
        <div className="mb-3 mobile:mb-4 flex-1">
          <Skeleton variant="text" lines={3} />
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1 mobile:gap-2 mb-3 mobile:mb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              width={Math.random() * 40 + 60}
              height={28}
              className="rounded-full"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col mobile:flex-row gap-2 mobile:gap-3 pt-3 mobile:pt-4 border-t border-gray-100 mt-auto">
          <Skeleton height={44} className="flex-1 rounded-lg" />
          <Skeleton height={44} className="flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Hero Section Skeleton
export const HeroSectionSkeleton: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 mobile:px-6 tablet:px-8 py-8 mobile:py-12 tablet:py-16 bg-gradient-to-br from-brandColorBackground to-slate-100">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 mobile:gap-10 tablet:gap-12 desktop:gap-16 items-center">
          {/* Content Section */}
          <div className="order-2 desktop:order-1 text-center desktop:text-left space-y-6 mobile:space-y-8">
            <div className="space-y-3 mobile:space-y-4">
              <Skeleton variant="text" height={48} width="80%" />
              <Skeleton variant="text" height={32} width="90%" />
              <Skeleton variant="text" lines={2} />
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-2 tablet:grid-cols-3 gap-4 mobile:gap-6 py-4 mobile:py-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="text-center p-3 mobile:p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                  <Skeleton height={40} width="60%" className="mx-auto mb-2" />
                  <Skeleton variant="text" height={16} width="80%" className="mx-auto" />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col mobile:flex-row gap-3 mobile:gap-4 justify-center desktop:justify-start pt-4">
              <Skeleton height={48} width={160} className="rounded-lg" />
              <Skeleton height={48} width={140} className="rounded-lg" />
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="order-1 desktop:order-2 flex justify-center">
            <div className="relative">
              <Skeleton
                variant="circular"
                width={320}
                height={320}
                className="mobile:w-80 mobile:h-80 tablet:w-96 tablet:h-96 desktop:w-[420px] desktop:h-[420px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skeleton;