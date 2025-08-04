// Project interface with all required fields
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  date: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image?: string;
  links: {
    demo?: string;
    code?: string;
    article?: string;
  };
  featured: boolean;
}

// Brand colors interface for consistent color management
export interface BrandColors {
  primary: string;
  accent: string;
  background: string;
  text: string;
  secondary: string;
}

// Hero section component props interface
export interface HeroSectionProps {
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
  stats: {
    experience: string;
    projects: string;
    [key: string]: string;
  };
  resumeUrl: string;
}

// Project gallery component props interface
export interface ProjectGalleryProps {
  projects: Project[];
  categories: string[];
}

// Project card component props interface
export interface ProjectCardProps {
  project: Project;
}