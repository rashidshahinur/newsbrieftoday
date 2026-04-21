export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  publishDate: string;
  author: string;
  featured?: boolean;
  readTime?: number;
  region?: string;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

export const CATEGORIES: Category[] = [
  { name: 'Bangladesh', slug: 'bangladesh', description: 'Latest news from Bangladesh' },
  { name: 'World', slug: 'world', description: 'International news and global affairs' },
  { name: 'Politics', slug: 'politics', description: 'Political developments and analysis' },
  { name: 'Tech', slug: 'tech', description: 'Technology and innovation' },
  { name: 'Business', slug: 'business', description: 'Business, economy and finance' },
  { name: 'Health', slug: 'health', description: 'Health, science and medicine' },
  { name: 'Culture', slug: 'culture', description: 'Arts, culture and lifestyle' },
  { name: 'Entertainment', slug: 'entertainment', description: 'Entertainment, celebrities and pop culture' },
];
