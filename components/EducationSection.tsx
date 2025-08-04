'use client';

import React, { useState } from 'react';

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  grade?: string;
  location?: string;
  skills?: string[];
  coursework?: string[];
}

interface EducationSectionProps {
  education: EducationItem[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleExpanded = (eduId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(eduId)) {
      newExpanded.delete(eduId);
    } else {
      newExpanded.add(eduId);
    }
    setExpandedCards(newExpanded);
  };
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-brandColorBackground">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brandColorText mb-4">
            Education
          </h2>
          <p className="text-brandColorSecondary text-lg">
            My academic journey and qualifications that have shaped my knowledge and skills.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-brandColorCard rounded-lg p-6 border border-brandColorBorder hover:border-brandColorPrimary/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Duration */}
              <div className="text-brandColorPrimary text-sm font-medium mb-3">
                {edu.duration}
              </div>

              {/* Institution */}
              <h3 className="text-xl font-bold text-brandColorText mb-2">
                {edu.institution}
              </h3>

              {/* Degree */}
              <h4 className="text-brandColorSecondary font-medium mb-2">
                {edu.degree}
              </h4>

              {/* Location and Grade */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-brandColorSecondary text-sm">
                  {edu.location || ''}
                </div>
                {edu.grade && (
                  <p className="text-brandColorSecondary text-sm">
                    GPA: {edu.grade}
                  </p>
                )}
              </div>

              {/* Key Coursework */}
              {(edu.coursework || edu.skills) && (
                <div className="space-y-3">
                  <h5 className="text-brandColorText font-medium text-sm">
                    Key Coursework
                  </h5>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {(() => {
                      const courses = edu.coursework || edu.skills || [];
                      const isExpanded = expandedCards.has(edu.id);
                      const displayCourses = isExpanded ? courses : courses.slice(0, 4);
                      
                      return (
                        <>
                          {displayCourses.map((course, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 text-brandColorSecondary"
                            >
                              <div className="w-1.5 h-1.5 bg-brandColorPrimary rounded-full flex-shrink-0"></div>
                              <span>{course}</span>
                            </div>
                          ))}
                          {courses.length > 4 && (
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-brandColorSecondary/50 rounded-full flex-shrink-0"></div>
                              <button
                                onClick={() => toggleExpanded(edu.id)}
                                className="text-xs italic text-brandColorSecondary hover:text-brandColorPrimary transition-colors duration-200 cursor-pointer"
                              >
                                {isExpanded 
                                  ? 'Show less' 
                                  : `+${courses.length - 4} more courses`
                                }
                              </button>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;