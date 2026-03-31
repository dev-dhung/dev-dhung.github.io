export type ProjectCategory = 'web' | 'mobile' | 'game';

export interface Project {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string;
  topics: string[];
  category: ProjectCategory;
  stars: number;
  updatedAt: string;
  images: string[];
  featured: boolean;
}

export interface PortfolioMeta {
  image?: string;
  images?: string[];
  featured?: boolean;
}
