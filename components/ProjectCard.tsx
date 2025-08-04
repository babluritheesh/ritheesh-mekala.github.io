'use client';

import React from 'react';
import { ProjectCardProps } from '@/types';
import OptimizedImage from './OptimizedImage';

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Handle missing project data
  if (!project) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-brandColorSecondary">Project data unavailable</p>
      </div>
    );
  }

  const {
    title = "Untitled Project",
    description = "No description available",
    category = "Uncategorized",
    technologies = [],
    date = new Date().toISOString(),
    level = "Intermediate",
    image,
    links = {},
    featured = false
  } = project;

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Get level color styling
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="group bg-brandColorCard rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-brandColorBorder hover:border-brandColorPrimary/30 transform hover:-translate-y-2 h-full flex flex-col">
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 mobile:top-4 left-3 mobile:left-4 z-10 bg-brandColorPrimary text-white px-2 mobile:px-3 py-1 rounded-full text-xs font-semibold">
          Featured
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-40 mobile:h-48 tablet:h-52 desktop:h-56 overflow-hidden flex-shrink-0">
        {image ? (
          <OptimizedImage
            src={image}
            alt={`${title} project screenshot`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 320px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            quality={85}
            fallbackSrc="/images/project-placeholder.svg"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brandColorBackground to-slate-200 flex items-center justify-center">
            <svg className="w-12 h-12 mobile:w-16 mobile:h-16 text-brandColorSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        )}
        
        {/* Overlay with category and level */}
        <div className="absolute top-3 mobile:top-4 right-3 mobile:right-4 flex flex-col gap-1 mobile:gap-2">
          <span className="bg-brandColorCard/90 backdrop-blur-sm text-brandColorText px-2 py-1 rounded-md text-xs font-medium border border-brandColorBorder">
            {category}
          </span>
          <span className="px-2 py-1 rounded-md text-xs font-medium bg-brandColorPrimary text-white">
            {level}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 mobile:p-6 flex-1 flex flex-col">
        {/* Title and Date */}
        <div className="flex justify-between items-start mb-2 mobile:mb-3">
          <h3 className="text-lg mobile:text-xl font-bold text-brandColorText group-hover:text-brandColorPrimary transition-colors duration-300 overflow-hidden leading-tight" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {title}
          </h3>
          <span className="text-xs mobile:text-sm text-brandColorSecondary ml-2 flex-shrink-0 whitespace-nowrap">
            {formatDate(date)}
          </span>
        </div>

        {/* Description */}
        <p className="text-brandColorText/80 text-sm mobile:text-base leading-relaxed mb-3 mobile:mb-4 overflow-hidden flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1 mobile:gap-2 mb-3 mobile:mb-4">
          {technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 mobile:px-3 py-1 bg-brandColorBackground text-brandColorText text-xs font-medium rounded-full border border-gray-200 group-hover:border-brandColorAccent/50 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2 mobile:px-3 py-1 bg-brandColorSecondary/10 text-brandColorSecondary text-xs font-medium rounded-full">
              +{technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Project Links */}
        <div className="flex flex-col mobile:flex-row gap-2 mobile:gap-3 pt-3 mobile:pt-4 border-t border-gray-100 mt-auto">
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 mobile:px-4 py-2 mobile:py-3 bg-brandColorPrimary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 flex-1 justify-center min-h-[40px] mobile:min-h-[44px] touch-manipulation transform active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Demo</span>
            </a>
          )}
          
          {links.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 mobile:px-4 py-2 mobile:py-3 border border-brandColorPrimary text-brandColorPrimary text-sm font-medium rounded-lg hover:bg-brandColorPrimary hover:text-white transition-all duration-300 flex-1 justify-center min-h-[40px] mobile:min-h-[44px] touch-manipulation transform active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span>Code</span>
            </a>
          )}
          
          {links.article && (
            <a
              href={links.article}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-brandColorSecondary hover:text-brandColorPrimary transition-colors duration-300 justify-center min-h-[40px] mobile:min-h-[44px] touch-manipulation transform active:scale-95"
              title="Read Article"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="mobile:hidden">Article</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;