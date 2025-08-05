'use client';

import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface Publication {
  id: string;
  title: string;
  abstract: string;
  journal: string;
  date: string;
  url: string;
  tags: string[];
  type: string;
  readTime: string;
  featured: boolean;
  icon: string;
}

interface PublicationsSectionProps {
  publications: Publication[];
}

const PublicationsSection: React.FC<PublicationsSectionProps> = ({ publications }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  if (!publications || publications.length === 0) {
    return null;
  }

  return (
    <section id="publications" className="py-20 px-4 bg-brandColorBackground">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brandColorText mb-4">
            Publications
          </h2>
          <p className="text-brandColorSecondary text-lg max-w-2xl mx-auto">
            Technical articles and insights on AI, machine learning, and software development
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication) => (
            <div 
              key={publication.id}
              className="bg-brandColorCard rounded-lg border border-brandColorBorder hover:border-brandColorPrimary transition-all duration-300 hover:shadow-lg group"
            >
              <div className="p-6">
                {/* Header with Icon and Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brandColorPrimary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg">{publication.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-brandColorText">{publication.type}</div>
                      <div className="text-xs text-brandColorSecondary">{formatDate(publication.date)}</div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-brandColorText mb-3 leading-tight group-hover:text-brandColorPrimary transition-colors">
                  {publication.title}
                </h3>

                {/* Abstract */}
                <p className="text-brandColorSecondary text-sm leading-relaxed mb-4 line-clamp-3">
                  {publication.abstract}
                </p>

                {/* Journal */}
                <div className="text-sm text-brandColorSecondary mb-4 font-medium">
                  Published in {publication.journal}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {publication.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-brandColorPrimary/10 text-brandColorPrimary text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {publication.tags.length > 3 && (
                    <span className="px-2 py-1 bg-brandColorSecondary/10 text-brandColorSecondary text-xs rounded-md">
                      +{publication.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brandColorSecondary">
                    {publication.readTime}
                  </span>
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                                         className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <span>Read Paper</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center mt-12">
          <a
            href="https://scholar.google.com" // Replace with your actual publications profile
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-brandColorCard border border-brandColorBorder text-brandColorText font-medium rounded-lg hover:border-brandColorPrimary hover:text-brandColorPrimary transition-all duration-300"
          >
            <span>View All Publications</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;