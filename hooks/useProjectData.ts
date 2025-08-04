'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { validateProjects } from '@/utils/dataValidation';

interface UseProjectDataReturn {
  projects: Project[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export const useProjectData = (initialData?: any[]): UseProjectDataReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let rawData = initialData;
      
      // If no initial data provided, try to load from JSON
      if (!rawData) {
        try {
          const response = await fetch('/data/projects.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.status}`);
          }
          rawData = await response.json();
        } catch (fetchError) {
          console.error('Failed to fetch project data:', fetchError);
          // Fallback to empty array if fetch fails
          rawData = [];
        }
      }

      // Validate and process the data
      const validatedProjects = validateProjects(rawData || []);
      const uniqueCategories = Array.from(new Set(validatedProjects.map(project => project.category)));

      setProjects(validatedProjects);
      setCategories(uniqueCategories);

      if (validatedProjects.length === 0 && rawData && rawData.length > 0) {
        setError('No valid projects found in the data');
      }

    } catch (err) {
      console.error('Error loading project data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load project data');
      setProjects([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const retry = () => {
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    projects,
    categories,
    isLoading,
    error,
    retry
  };
};