export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  technologies: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  images: ProjectImage[];
  status: string;
  period: string | null;
}

export interface ProjectGalleryLabels {
  imageCount: string;
  close: string;
  previous: string;
  next: string;
  viewImage: string;
  detailedDescription: string;
  keyFeatures: string;
  technologies: string;
  repository: string;
  liveDemo: string;
}
