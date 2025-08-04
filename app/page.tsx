import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectGallery from '@/components/ProjectGallery';
import ContactSection from '@/components/ContactSection';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import ErrorBoundary from '@/components/ErrorBoundary';
import projectsData from '@/data/projects.json';
import profileData from '@/data/profile.json';
import { Project } from '@/types';
import { validateProjects, validateHeroData } from '@/utils/dataValidation';

export default function Home() {
  const rawHeroData = {
    name: profileData.personal.name,
    title: "Co-founder & CTO @ ThinkArc | 2x Alabama Launchpad Winner | AI/ML Engineer | MSCS | Ex-IBM",
    tagline: "Architecting intelligent, real-world applications of large language models, agent frameworks, and service interoperability protocols. Pioneering machine-readable service layers for the AI-native internet at FinderBee marketplace.",
    profileImage: profileData.personal.profileImage,
    stats: {
      experience: "4+",
      projects: "6+",
      technologies: "25+"
    },
    resumeUrl: "/resume/ritheesh-mekala-resume.pdf"
  };

  // Validate hero data with fallbacks
  const heroData = validateHeroData(rawHeroData);

  // Validate and filter projects data
  const projects = validateProjects(projectsData);
  
  // Extract unique categories from validated projects
  const categories = Array.from(new Set(projects.map(project => project.category)));

  return (
    <div className="bg-brandColorBackground min-h-screen transition-colors duration-300">
      <PerformanceMonitor />
      <Navigation />
      
      <ErrorBoundary
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-brandColorBackground">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-brandColorText mb-4">
                Unable to load hero section
              </h2>
              <p className="text-brandColorSecondary">
                Please refresh the page to try again.
              </p>
            </div>
          </div>
        }
      >
        <HeroSection {...heroData} />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <div className="py-12 px-4 text-center bg-brandColorBackground">
            <h2 className="text-2xl font-bold text-brandColorText mb-4">
              Unable to load experience
            </h2>
            <p className="text-brandColorSecondary">
              There was an error loading the experience section.
            </p>
          </div>
        }
      >
        <ExperienceSection experiences={profileData.experience} />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <div className="py-12 px-4 text-center bg-brandColorBackground">
            <h2 className="text-2xl font-bold text-brandColorText mb-4">
              Unable to load education
            </h2>
            <p className="text-brandColorSecondary">
              There was an error loading the education section.
            </p>
          </div>
        }
      >
        <EducationSection education={profileData.education} />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <div className="py-12 px-4 text-center bg-brandColorBackground">
            <h2 className="text-2xl font-bold text-brandColorText mb-4">
              Unable to load projects
            </h2>
            <p className="text-brandColorSecondary">
              There was an error loading the project gallery. Please refresh the page.
            </p>
          </div>
        }
      >
        <ProjectGallery projects={projects} categories={categories} />
      </ErrorBoundary>

      <ContactSection />
    </div>
  )
}