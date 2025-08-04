import { Project } from '@/types';

// Validate and sanitize project data
export const validateProject = (project: any): Project | null => {
  try {
    // Check required fields
    if (!project.id || typeof project.id !== 'string') {
      console.warn('Project missing or invalid id:', project);
      return null;
    }

    if (!project.title || typeof project.title !== 'string') {
      console.warn('Project missing or invalid title:', project);
      return null;
    }

    if (!project.description || typeof project.description !== 'string') {
      console.warn('Project missing or invalid description:', project);
      return null;
    }

    if (!project.category || typeof project.category !== 'string') {
      console.warn('Project missing or invalid category:', project);
      return null;
    }

    if (!Array.isArray(project.technologies)) {
      console.warn('Project missing or invalid technologies array:', project);
      return null;
    }

    // Validate level
    const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
    if (!validLevels.includes(project.level)) {
      console.warn('Project has invalid level, defaulting to Intermediate:', project);
      project.level = 'Intermediate';
    }

    // Validate date
    if (!project.date || isNaN(Date.parse(project.date))) {
      console.warn('Project has invalid date, using current date:', project);
      project.date = new Date().toISOString().split('T')[0];
    }

    // Ensure featured is boolean
    if (typeof project.featured !== 'boolean') {
      project.featured = false;
    }

    // Validate links object
    if (!project.links || typeof project.links !== 'object') {
      project.links = {};
    }

    // Validate individual link URLs
    const validateUrl = (url: string): boolean => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (project.links.demo && !validateUrl(project.links.demo)) {
      console.warn('Project has invalid demo URL, removing:', project.links.demo);
      delete project.links.demo;
    }

    if (project.links.code && !validateUrl(project.links.code)) {
      console.warn('Project has invalid code URL, removing:', project.links.code);
      delete project.links.code;
    }

    if (project.links.article && !validateUrl(project.links.article)) {
      console.warn('Project has invalid article URL, removing:', project.links.article);
      delete project.links.article;
    }

    // Validate image URL if present
    if (project.image && !validateUrl(project.image)) {
      console.warn('Project has invalid image URL, removing:', project.image);
      delete project.image;
    }

    return project as Project;
  } catch (error) {
    console.error('Error validating project:', error, project);
    return null;
  }
};

// Validate and filter array of projects
export const validateProjects = (projects: any[]): Project[] => {
  if (!Array.isArray(projects)) {
    console.error('Projects data is not an array:', projects);
    return [];
  }

  const validProjects = projects
    .map(validateProject)
    .filter((project): project is Project => project !== null);

  if (validProjects.length !== projects.length) {
    console.warn(`Filtered out ${projects.length - validProjects.length} invalid projects`);
  }

  return validProjects;
};

// Validate hero section data
export const validateHeroData = (heroData: any) => {
  const defaults = {
    name: "Portfolio Owner",
    title: "Developer",
    tagline: "Building amazing things with code",
    profileImage: "/images/default-avatar.svg",
    stats: {
      experience: "0+",
      projects: "0+",
      technologies: "0+"
    },
    resumeUrl: "#"
  };

  try {
    return {
      name: heroData?.name || defaults.name,
      title: heroData?.title || defaults.title,
      tagline: heroData?.tagline || defaults.tagline,
      profileImage: heroData?.profileImage || defaults.profileImage,
      stats: {
        ...defaults.stats,
        ...(heroData?.stats || {})
      },
      resumeUrl: heroData?.resumeUrl || defaults.resumeUrl
    };
  } catch (error) {
    console.error('Error validating hero data:', error);
    return defaults;
  }
};