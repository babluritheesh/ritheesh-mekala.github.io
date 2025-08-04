'use client';

import React, { useState } from 'react';

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-brandColorBackground">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brandColorText mb-4">
            Professional Experience
          </h2>
          <p className="text-brandColorSecondary text-lg">
            My professional journey and key responsibilities in various roles.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-brandColorBorder"></div>

          <div className="space-y-8">
            {experiences.map((experience, index) => {
              const isExpanded = hoveredExperience === experience.id;
              
              return (
                <div 
                  key={experience.id} 
                  className="relative flex items-start"
                  onMouseEnter={() => setHoveredExperience(experience.id)}
                  onMouseLeave={() => setHoveredExperience(null)}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2 sm:left-6 w-4 h-4 rounded-full border-4 border-brandColorBackground z-10 transition-all duration-300 ${
                    isExpanded 
                      ? 'bg-brandColorPrimary scale-125' 
                      : 'bg-brandColorPrimary hover:scale-110'
                  }`}></div>

                  {/* Content */}
                  <div className="ml-12 sm:ml-20 flex-1">
                    <div className={`bg-brandColorCard rounded-lg border transition-all duration-300 cursor-pointer ${
                      isExpanded 
                        ? 'border-brandColorPrimary/50 shadow-lg shadow-brandColorPrimary/10 scale-[1.02]' 
                        : 'border-brandColorBorder hover:border-brandColorPrimary/30'
                    }`}>
                      
                      {/* Always visible header */}
                      <div className="p-6">
                        {/* Date */}
                        <div className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                          isExpanded ? 'text-brandColorPrimary' : 'text-brandColorPrimary/80'
                        }`}>
                          {experience.duration}
                        </div>

                        {/* Position and Company */}
                        <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                          isExpanded ? 'text-brandColorText' : 'text-brandColorText/90'
                        }`}>
                          {experience.position}
                        </h3>
                        <h4 className="text-brandColorSecondary font-medium mb-2">
                          {experience.company}
                        </h4>
                        
                        {/* Location - only show when not expanded to save space */}
                        {!isExpanded && (
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-brandColorPrimary rounded-full flex-shrink-0"></div>
                            <p className="text-brandColorSecondary text-sm">
                              {experience.location}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Expandable content */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-6 pb-6 space-y-4">
                          {/* Location when expanded */}
                          <p className="text-brandColorSecondary text-sm">
                            📍 {experience.location}
                          </p>

                          {/* Description */}
                          <p className="text-brandColorSecondary leading-relaxed">
                            {experience.description}
                          </p>

                          {/* Highlights */}
                          {experience.highlights.length > 0 && (
                            <div>
                              <h5 className="text-brandColorText font-semibold mb-3 text-sm">Key Achievements:</h5>
                              <ul className="space-y-2">
                                {experience.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start text-brandColorSecondary text-sm">
                                    <div className="w-1.5 h-1.5 bg-brandColorPrimary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Technologies */}
                          {experience.technologies.length > 0 && (
                            <div>
                              <h5 className="text-brandColorText font-semibold mb-3 text-sm">Technologies:</h5>
                              <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-brandColorBackground text-brandColorText text-xs rounded-full border border-brandColorBorder hover:border-brandColorPrimary/50 transition-colors duration-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;