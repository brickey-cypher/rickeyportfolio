export interface Project {
  title: string;
  description: string;
  pdf: string;
}

export interface ProjectsProps {
  projects: Project[];
}
