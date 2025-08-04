import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectGallery from './ProjectGallery';
import { Project } from '@/types';

// Mock data for testing
const mockProjects: Project[] = [
  {
    id: 'test-1',
    title: 'Test Project',
    description: 'Test description',
    category: 'Web Development',
    technologies: ['React', 'TypeScript'],
    date: '2024-01-01',
    level: 'Intermediate',
    links: {},
    featured: false
  }
];

const mockCategories = ['Web Development', 'GenAI'];

describe('ProjectGallery Error Handling', () => {
  test('renders empty state when no projects provided', () => {
    render(<ProjectGallery projects={[]} categories={[]} />);
    expect(screen.getByText('No projects available')).toBeInTheDocument();
  });

  test('renders projects when valid data provided', () => {
    render(<ProjectGallery projects={mockProjects} categories={mockCategories} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  test('handles null projects gracefully', () => {
    render(<ProjectGallery projects={null as any} categories={[]} />);
    expect(screen.getByText('No projects available')).toBeInTheDocument();
  });
});