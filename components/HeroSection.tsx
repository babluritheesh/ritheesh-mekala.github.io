'use client';

import React, { useState, useEffect } from 'react';
import { HeroSectionProps } from '@/types';
import OptimizedImage from './OptimizedImage';
import { getImagePath } from '@/utils/assetPath';

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Portfolio Owner",
  title = "Developer",
  tagline = "Building amazing things with code",
  profileImage = "/images/default-avatar.svg",
  stats = { experience: "0+", projects: "0+", technologies: "0+" },
  resumeUrl = "#",
}) => {
  const [animatedStats, setAnimatedStats] = useState<{ [key: string]: number }>({});
  const [imageError, setImageError] = useState(false);

  // Debug logging
  console.log(`HeroSection profileImage: ${profileImage}`);

  // Animation effect for statistics counters
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      Object.entries(stats).forEach(([key, value]) => {
        const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const currentValue = Math.floor(numericValue * progress);
          
          setAnimatedStats(prev => ({
            ...prev,
            [key]: currentValue
          }));

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    };

    animateCounters();
  }, [stats]);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 mobile:px-6 tablet:px-8 py-20 mobile:py-24 tablet:py-32 bg-brandColorBackground">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 mobile:gap-10 tablet:gap-12 desktop:gap-16 items-center min-h-[80vh]">
          {/* Content Section */}
          <div className="order-2 desktop:order-1 text-center desktop:text-left space-y-6 mobile:space-y-8 flex flex-col justify-center">
            <div className="space-y-4 mobile:space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl mobile:text-5xl tablet:text-6xl desktop:text-7xl font-bold leading-tight">
                  <span className="text-brandColorPrimary">Ritheesh</span>
                  <br />
                  <span className="text-brandColorPrimary">Mekala</span>
                </h1>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl mobile:text-2xl tablet:text-3xl text-brandColorSecondary font-normal leading-relaxed">
                  Co-founder & CTO at ThinkArc
                </h3>
                <p className="text-lg mobile:text-xl tablet:text-2xl text-brandColorSecondary font-light leading-relaxed">
                  AI/ML & Software Engineer
                </p>
              </div>
              <p className="text-base mobile:text-lg text-brandColorSecondary max-w-lg mx-auto desktop:mx-0 leading-relaxed">
                Previously helped Cognera Health win Alabama Launchpad. Building end-to-end AI solutions from research prototypes to deployed applications.
              </p>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-2 gap-8 mobile:gap-12 py-6 mobile:py-8"> 
             {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-3xl mobile:text-4xl tablet:text-5xl font-bold text-brandColorPrimary mb-2">
                    {animatedStats[key] || 0}
                    {value.includes('+') && '+'}
                  </div>
                  <div className="text-sm mobile:text-base text-brandColorSecondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>

            {/* About Me Section */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center space-x-4">
                <h4 className="text-xl font-semibold text-brandColorText">About Me</h4>
                <div className="flex items-center space-x-2">
                </div>
              </div>
              <div className="text-brandColorSecondary leading-relaxed max-w-lg mx-auto desktop:mx-0 space-y-4">
                <p>
                  Co-founder & CTO at <span className="text-brandColorText font-medium">ThinkArc</span>, where I&apos;m shaping the future of AI-native infrastructure. Previously led the technical efforts that helped <span className="text-brandColorText font-medium">Cognera Health</span> win the <span className="text-brandColorPrimary font-medium">Alabama Launchpad ($100K)</span> by delivering real-world AI solutions for healthcare.
                </p>
                
                <p>
                  I specialize in transforming cutting-edge research—especially around <span className="text-brandColorPrimary">LLMs and GenAI</span>—into production-grade systems. My work spans from building secure, scalable cloud backends to architecting intelligent products that make a tangible difference.
                </p>
                
                <p className="text-sm italic border-l-2 border-brandColorPrimary pl-4">
                  Driven by <span className="text-brandColorPrimary">curiosity</span>, guided by <span className="text-brandColorText">systems thinking</span>, and fueled by a mission to solve meaningful problems with AI.
                </p>
              </div>

            </div>
          </div>

          {/* Profile Image Section */}
          <div className="order-1 desktop:order-2 flex flex-col items-center justify-start desktop:justify-start -mt-12 desktop:-mt-80">
            <div className="relative mb-4">
              <div className="w-64 h-64 mobile:w-80 mobile:h-80 tablet:w-96 tablet:h-96 desktop:w-[420px] desktop:h-[420px] relative rounded-full overflow-hidden shadow-2xl border-4 border-white transition-all duration-500 hover:shadow-3xl hover:scale-105">
                {/* Debug: Let's see what paths are being used */}
                <img
                  src={profileImage}
                  alt={`${name} - Profile Picture`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    console.error('Image failed to load:', profileImage);
                    console.error('Attempted URL:', (e.target as HTMLImageElement).src);
                    console.error('Current working directory context');
                    setImageError(true);
                    // Try fallback
                    (e.target as HTMLImageElement).src = '/images/default-avatar.svg';
                  }}
                  onLoad={() => {
                    console.log('✅ Image loaded successfully!');
                    console.log('Profile image path:', profileImage);
                    console.log('Actual loaded URL:', (document.querySelector('img[alt*="Profile Picture"]') as HTMLImageElement)?.src);
                  }}
                />
              </div>
              {/* Decorative elements - responsive sizing */}
              <div className="absolute -top-2 -right-2 mobile:-top-4 mobile:-right-4 w-16 h-16 mobile:w-24 mobile:h-24 bg-brandColorAccent/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 mobile:-bottom-4 mobile:-left-4 w-20 h-20 mobile:w-32 mobile:h-32 bg-brandColorPrimary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Tagline and Social Links under photo */}
            <div className="text-center space-y-4">
              {/* Tagline */}
              <p className="text-sm italic text-brandColorSecondary">
                Driven by <span className="text-brandColorPrimary">curiosity</span>, empowered by <span className="text-brandColorPrimary">resilience</span>.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center justify-center space-x-6">
                <a
                  href="https://github.com/babluritheesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-brandColorSecondary hover:text-brandColorText transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ritheesh-mekala-364811231/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-brandColorSecondary hover:text-brandColorText transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;