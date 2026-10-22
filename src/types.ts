export type Language = 'en' | 'ar';

export type NavView = 
  | 'home'
  | 'projects'
  | 'project-detail'
  | 'tools'
  | 'extensions'
  | 'services'
  | 'journal'
  | 'developer'
  | 'social'
  | 'about'
  | 'android'
  | 'contact'
  | 'admin'
  | 'parity';

export interface Project {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  slug: string;
  category: 'ai' | 'fintech' | 'aerospace' | 'enterprise' | 'motion';
  client: string;
  year: string;
  summary: {
    en: string;
    ar: string;
  };
  challenge: {
    en: string;
    ar: string;
  };
  solution: {
    en: string;
    ar: string;
  };
  technologies: string[];
  metrics: {
    label: { en: string; ar: string };
    value: string;
  }[];
  image: string;
  icon?: string;
  logo?: string;
  gallery?: string[];
  projectUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  status?: 'active' | 'completed' | 'experimental';
  featured: boolean;
  published: boolean;
  publicationDate?: string;
  seoTitle?: { en: string; ar: string };
  seoDescription?: { en: string; ar: string };
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  description: {
    en: string;
    ar: string;
  };
  icon: string;
  category: string;
  version: string;
  docsUrl?: string;
  websiteUrl?: string;
  repoUrl?: string;
  downloadUrl?: string;
  compatibility: string[];
  installationInstructions: {
    en: string;
    ar: string;
  };
  tags: string[];
  status: 'stable' | 'beta' | 'archived';
  published: boolean;
}

export interface ExtensionItem {
  id: string;
  name: string;
  slug: string;
  description: {
    en: string;
    ar: string;
  };
  icon: string;
  category: string;
  compatibility: string[];
  version: string;
  docsUrl?: string;
  repoUrl?: string;
  installationInstructions: {
    en: string;
    ar: string;
  };
  configInstructions: {
    en: string;
    ar: string;
  };
  relatedTools: string[];
  status: 'active' | 'preview';
  published: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  features: {
    en: string[];
    ar: string[];
  };
  iconName: string;
}

export interface JournalArticle {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  published: boolean;
}

export interface MetricItem {
  id: string;
  value: string;
  suffix?: string;
  label: {
    en: string;
    ar: string;
  };
  context: {
    en: string;
    ar: string;
  };
}

export interface SocialProfile {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  enabled: boolean;
  displayOrder: number;
}

export interface DeveloperProfile {
  displayName: string;
  identityStatement: {
    en: string;
    ar: string;
  };
  slogan: {
    en: string;
    ar: string;
  };
  introduction: {
    en: string;
    ar: string;
  };
  location: {
    en: string;
    ar: string;
  };
  terminalPrompt: string;
  image: string;
  emailAddresses: {
    label: string;
    email: string;
    url: string;
  }[];
  socialProfileIds: string[];
}

export interface CategoryItem {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  type: 'project' | 'tool' | 'extension' | 'service';
  color: string;
  count?: number;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  uploadDate: string;
  altText: {
    en: string;
    ar: string;
  };
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'superadmin' | 'editor' | 'auditor';
  lastLogin: string;
  status: 'active' | 'suspended';
  createdDate: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  details: string;
  ip: string;
  status: 'success' | 'warning' | 'error';
}

export interface AndroidReleaseInfo {
  version: string;
  buildNumber: number;
  apkFileName: string;
  apkUrl: string;
  releaseDate: string;
  fileSize: string;
  minAndroid: string;
  targetAndroid: string;
  sha256: string;
  changelog: {
    en: string[];
    ar: string[];
  };
}

export interface SiteSettings {
  brandName: string;
  primaryStatement: {
    en: string;
    ar: string;
  };
  secondaryStatement: {
    en: string;
    ar: string;
  };
  heroIdentity: {
    en: string;
    ar: string;
  };
  location: {
    en: string;
    ar: string;
  };
  terminalSignature: string;
  contactEmail: string;
  contactPhone: string;
  homepageBlocks: string[];
  audioTrackUrl: string;
  seoTitleTemplate?: string;
  seoKeywords?: string[];
  googleSiteVerification?: string;
}
