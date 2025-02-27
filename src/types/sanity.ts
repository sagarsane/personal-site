import { PortableTextBlock } from '@portabletext/types';
import { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface AboutData {
  mainImage: SanityAsset;
  bio: PortableTextBlock[];
  skills: SkillCategory[];
  interests: string[];
  timeline: TimelineItem[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  logo?: SanityAsset;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  description: PortableTextBlock[];
  technologies: string[];
  achievements: string[];
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityAsset;
  publishedAt: string;
  body: PortableTextBlock[];
  author?: Author;
  categories: Category[];
}

export interface Author {
  name: string;
  image?: SanityAsset;
  bio?: PortableTextBlock[];
}

export interface Category {
  title: string;
  description?: string;
}

export interface Project {
  title: string;
  slug: { current: string };
  description: PortableTextBlock[];
  mainImage?: SanityAsset;
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  featured: boolean;
  order: number;
} 