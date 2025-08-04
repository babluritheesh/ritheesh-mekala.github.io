'use client';

import React, { useState, useMemo } from 'react';
import { ProjectGalleryProps } from '@/types';
import ErrorBoundary from './ErrorBoundary';

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects, categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Projects');
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Create domain categories mapping based on actual data
  const domainCategories = useMemo(() => [
    { name: 'All Projects', key: 'All' },
    { name: 'GenAI', key: 'GenAI' },
    { name: 'Healthcare AI', key: 'Healthcare AI' },
    { name: 'MLOps', key: 'MLOps' },
    { name: 'Web Development', key: 'Web Development' },
    { name: 'Cloud Infrastructure', key: 'Cloud Infrastructure' },
  ], []);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (!projects || projects.length === 0) {
      return [];
    }
    if (activeCategory === 'All Projects') {
      return projects;
    }
    const selectedCategory = domainCategories.find(cat => cat.name === activeCategory);
    if (selectedCategory) {
      return projects.filter(project => project.category === selectedCategory.key);
    }
    return projects;
  }, [projects, activeCategory, domainCategories]);

  // Handle case where no projects are provided
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-12 px-4 bg-brandColorBackground min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brandColorText mb-4">Projects</h2>
            <p className="text-brandColorSecondary text-lg">
              Showcasing my work across AI/ML, GenAI, and full-stack development.
            </p>
          </div>
          <div className="text-center py-20">
            <p className="text-brandColorSecondary">No projects available</p>
          </div>
        </div>
      </section>
    );
  }

  // Format date to match the design
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="projects" className="py-20 px-4 bg-brandColorBackground min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brandColorText mb-4">Projects</h2>
          <p className="text-brandColorSecondary text-lg">
            Showcasing my work across AI/ML, GenAI, and full-stack development.
          </p>
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-brandColorCard rounded-lg p-6 border border-brandColorBorder">
              {/* Show All Projects Toggle */}
              <div className="flex items-center justify-between mb-6">
                <button 
                  className="flex items-center space-x-2 text-brandColorSecondary hover:text-brandColorText transition-colors duration-200"
                  onClick={() => setShowAllProjects(!showAllProjects)}
                >
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showAllProjects ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-sm">Show All {projects.length} Projects</span>
                </button>
              </div>

              {/* Filters Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-4 h-4 text-brandColorSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <span className="text-brandColorText font-medium">Filters</span>
                </div>
              </div>

              {/* Domain Categories */}
              <div>
                <h3 className="text-brandColorText font-medium mb-4">Domain</h3>
                <div className="space-y-2">
                  {domainCategories.map((category) => {
                    const projectCount = category.key === 'All' 
                      ? projects.length 
                      : projects.filter(p => p.category === category.key).length;
                    
                    return (
                      <button
                        key={category.name}
                        onClick={() => setActiveCategory(category.name)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                          activeCategory === category.name
                            ? 'bg-brandColorPrimary text-white'
                            : 'text-brandColorSecondary hover:text-brandColorText hover:bg-brandColorBackground'
                        }`}
                      >
                        <span className="text-sm">{category.name}</span>
                        {projectCount > 0 && (
                          <span className="text-xs opacity-75">({projectCount})</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ErrorBoundary key={project.id} fallback={<div className="p-4 text-red-500">Error loading project</div>}>
                  <div className="bg-brandColorCard rounded-lg p-6 border border-brandColorBorder hover:border-brandColorPrimary/30 transition-all duration-300 group">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-brandColorText group-hover:text-brandColorPrimary transition-colors duration-200">
                          {project.title}
                        </h3>
                        {project.links?.demo && (
                          <a 
                            href={project.links.demo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-brandColorSecondary hover:text-brandColorPrimary transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-brandColorSecondary mb-1">
                          {formatDate(project.date)}
                        </div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          project.level === 'Advanced' 
                            ? 'bg-purple-900/50 text-purple-200' 
                            : project.level === 'Intermediate'
                            ? 'bg-blue-900/50 text-blue-200'
                            : 'bg-green-900/50 text-green-200'
                        }`}>
                          {project.level}
                        </span>
                      </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-brandColorSecondary text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 6).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-brandColorBackground text-brandColorText text-xs rounded border border-brandColorBorder"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="px-2 py-1 text-brandColorSecondary text-xs">
                          +{project.technologies.length - 6} more
                        </span>
                      )}
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center justify-between">
                      <button className="text-brandColorPrimary text-sm font-medium hover:underline transition-all duration-200 flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Read More</span>
                      </button>
                      
                      {/* Project Links */}
                      <div className="flex items-center space-x-2">
                        {project.links?.code && (
                          <a 
                            href={project.links.code} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-brandColorSecondary hover:text-brandColorText transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-brandColorText mb-2">No projects found</h3>
                <p className="text-brandColorSecondary">
                  No projects match the selected category. Try selecting a different category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;