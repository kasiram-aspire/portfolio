export type ProfileData = {
  name: string;
  tagline: string;
  typedTitles: string[];
  avatarUrl: string;
  heroBgUrl: string;
  bioLead: string;
  bioParagraph1: string;
  bioParagraph2: string;
  roleTitle: string;
  roleDescription: string;
  details: {
    birthday: string;
    college?: string;
    website?: string;
    phone: string;
    city: string;
    age: number;
    degree: string;
    email: string;
    availability?: string;
    freelance?: string;
  };
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    skype?: string;
    linkedin?: string;
    github?: string;
  };
  stats: {
    projectsCompleted: number;
    codingChallenges: number;
    technologiesExplored: number;
    hoursPracticalLearning: number;
  };
};

export type SkillCategory = 'all' | 'backend' | 'database' | 'tools';

export type Skill = {
  name: string;
  percentage: number;
  category: SkillCategory;
  iconName?: string;
};

export type TimelineItem = {
  id: string;
  title: string;
  period: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  skillsUsed: string[];
};

export type ProjectCategory = 'all' | 'app' | 'card' | 'web' | 'ai';

export type ProjectItem = {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  client?: string;
  date?: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  quote: string;
};

export type AccentColor = 'sky' | 'emerald' | 'violet' | 'rose' | 'amber';
