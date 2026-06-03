export type ClinicSettings = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  region: string;
  rating: number;
  reviewCount: number;
  phoneDisplay: string;
  phoneTel: string;
  phoneDisplay2: string;
  phoneTel2: string;
  whatsapp: string;
  addressLine: string;
  addressLine2: string;
  mapSearchQuery: string;
  mapEmbedSrc: string;
  hoursSummary: string;
  openingNext: string;
  socialInstagram: string;
  socialFacebook: string;
  updatedAt?: number;
  createdAt?: number;
};

export type HeroSection = {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  heroImageUrl: string;
  heroImageAlt: string;
  heroVisualUrl: string;
  heroVisualAlt: string;
  order: number;
  updatedAt?: number;
  createdAt?: number;
};

export type AboutContent = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  philosophy: string;
  features: Array<{
    icon: string;
    title: string;
    text: string;
  }>;
  videoUrl: string;
  updatedAt?: number;
  createdAt?: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  category: string;
  featured: boolean;
  updatedAt?: number;
  createdAt?: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  order: number;
  updatedAt?: number;
  createdAt?: number;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating?: number;
  featured: boolean;
  imageUrl?: string;
  order: number;
  updatedAt?: number;
  createdAt?: number;
};

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  category?: string;
  order: number;
  updatedAt?: number;
  createdAt?: number;
};

export type SeoData = {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  updatedAt?: number;
  createdAt?: number;
};
