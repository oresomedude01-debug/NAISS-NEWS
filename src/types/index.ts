/**
 * Core type definitions for the NAISS News platform
 * Designed for type safety and better DX
 */

export interface Author {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
  };
  bio?: string;
  email?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string; // For visual categorization
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any[]; // Portable text blocks
  image?: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  };
  author: Author;
  category: Category;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  status: 'draft' | 'published' | 'archived';
  views?: number;
  seo?: {
    metaDescription?: string;
    keywords?: string[];
    ogImage?: {
      asset: {
        url: string;
      };
    };
  };
}

export interface PostListItem extends Omit<Post, 'content'> {
  // Lightweight version for listing pages
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  page: number;
  pageSize: number;
}

export interface SeoMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  ogType?: 'website' | 'article';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  keywords?: string[];
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: NavLink[];
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}
