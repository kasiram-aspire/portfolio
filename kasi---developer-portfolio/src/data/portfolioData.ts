import { ProfileData, Skill, TimelineItem, ProjectItem, ServiceItem, TestimonialItem } from '../types';

// High resolution, curated developer portraits matching the uploaded image aesthetics
export const HERO_IMAGE_CASUAL_KASI = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=85';
export const HERO_FALLBACK_PORTRAIT = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=85';
export const HERO_OFFICE_BG = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85';
export const AVATAR_ALEX = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
export const AVATAR_KASI = 'assets/swd_kasi.png';

export const alexProfile: ProfileData = {
  name: 'Alex Smith',
  tagline: 'Senior Full Stack Engineer & AI Systems Architect',
  typedTitles: ['Software Engineer', 'BackEnd Developer', 'Prompt Engineer'],
  avatarUrl: AVATAR_ALEX,
  heroBgUrl: HERO_IMAGE_CASUAL_KASI,
  bioLead: 'Passionate and results-driven Senior Frontend Engineer and Full-Stack Developer with over 7 years of expertise in crafting modern, high-performance web applications and intuitive user interfaces.',
  bioParagraph1: 'Specializing in React, TypeScript, Next.js, and modern CSS architecture. I bridge the gap between design vision and technical execution, building scalable digital experiences with pixel-perfect precision and effortless performance.',
  bioParagraph2: 'Driven by clean code, accessibility, and modern motion design. I collaborate with high-growth startups and visionary brands worldwide to ship memorable digital products.',
  roleTitle: 'UI/UX Designer & Web Developer',
  roleDescription: 'Crafting responsive, human-centered web software that combines sleek aesthetic elegance with bulletproof software engineering.',
  details: {
    birthday: '1 May 1995',
    website: 'https://alexsmith.dev',
    phone: '+1 (555) 234-5678',
    city: 'San Francisco, CA',
    age: 29,
    degree: 'Master of Computer Science',
    email: 'alex.smith@example.com',
    freelance: 'Available Immediately',
  },
  socials: {
    skype: 'skype:alex.smith.dev',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  stats: {
    projectsCompleted: 15,
    codingChallenges: 500,
    technologiesExplored: 20,
    hoursPracticalLearning: 2500,
  },
};

export const kasiProfile: ProfileData = {
  name: 'Kasi Ram',
  tagline: 'Software Engineer & AI Application Architect',
  typedTitles: ['Software Engineer', 'BackEnd Developer', 'Prompt Engineer'],
  avatarUrl: AVATAR_KASI,     
  heroBgUrl: HERO_IMAGE_CASUAL_KASI,
  bioLead: 'Software Engineer specializing in scalable backend systems, intelligent applications, and real-time dashboards, crafting high-performance digital experiences with modern design and robust architecture.',
  bioParagraph1: 'Engineered scalable Java backend applications, RESTful APIs, and microservices using Spring Boot and modern cloud technologies, with a focus on performance, reliability, and clean architecture.',
  bioParagraph2: 'Passionate about designing efficient backend systems, optimizing database performance, implementing secure authentication, and building maintainable, production-ready software solutions.',
  roleTitle: 'Software Engineer',
  roleDescription: 'Building next-generation intelligent applications with seamless design systems and reactive backends.',
  details: {
    birthday: '17 Apirl 2001',
    college: 'Kongu Engineering college',
    phone: '+91 9952563951',
    city: 'Chennai,India / Remote',
    age: 25,
    degree: 'B.E. in Electronics And Communication Engineering',
    email: 'kasiram186@gmail.com',
    availability: 'Open to Full-Time Opportunities',
    freelance: 'Open to work',
  },
  socials: {
    skype: 'skype:kasideepi',
    linkedin: 'https://linkedin.com/in/kasideepi',
    github: 'https://github.com/kasideepi',
  },
  stats: {
    projectsCompleted: 8,
    codingChallenges: 300,
    technologiesExplored: 12,
    hoursPracticalLearning: 1500,
  },
};

export const defaultSkills: Skill[] = [
   { name: 'Java', percentage: 90, category: 'backend' },
  { name: 'Spring Boot', percentage: 88, category: 'backend' },
  { name: 'Spring Security & JWT', percentage: 85, category: 'backend' },
  { name: 'RESTful APIs', percentage: 90, category: 'backend' },
  { name: 'Microservices Architecture', percentage: 85, category: 'backend' },
  { name: 'Quarkus', percentage: 82, category: 'backend' },
  { name: 'Apache Camel', percentage: 80, category: 'backend' },
  { name: 'Apache Kafka', percentage: 78, category: 'backend' },
  { name: 'MySQL & PostgreSQL', percentage: 85, category: 'database' },
  { name: 'Python & AI Integration', percentage: 80, category: 'backend' },
  { name: 'Git & GitHub', percentage: 88, category: 'tools' },
];

export const educationTimeline: TimelineItem[] = [
  
  {
    id: 'edu-1',
    title: 'Bachelor of Electronics and Communication Engineering',
    period: '2019 - 2023',
    organization: 'kongu Engineering College',
    location: 'Perunduarai, Erode',
   description: 'Comprehensive study of analog and digital electronics, communication systems, embedded systems, signal processing, microprocessors, and electronic circuit design.',
    highlights: [
  '2nd Place Winner – Smart India Hackathon (SIH)',
  'Presented technical research at a National Paper Presentation Conference',
  'Participated in multiple technical innovation and software development events',
  ],
    skillsUsed: ['c++', 'python', 'java', 'Machine learning','Internet of Things','Embedded c'],
  },
];

export const experienceTimeline: TimelineItem[] = [
  {
  id: 'exp-1',
  title: 'Software Engineer',
  period: '2024 - Present',
  organization: 'Aspire Systems',
  location: 'Siruseri, Chennai (Hybrid)',
  description:
    'Developing and maintaining enterprise-grade backend applications using Java, Spring Boot, and microservices architecture. Collaborating with cross-functional teams to build scalable REST APIs, optimize application performance, and deliver reliable business solutions.',
  highlights: [
    'Developed and enhanced RESTful APIs using Java, Spring Boot, and Spring Security.',
    'Implemented microservices-based solutions with database integration and secure authentication mechanisms.',
    'Contributed to application performance optimization, bug fixes, and feature enhancements while following clean code and Agile development practices.',
  ],
  skillsUsed: [
    'Java',
    'Spring Boot',
    'Spring Security',
    'Microservices',
    'REST APIs',
    'MySQL',
    'Git',
    'Maven',
    'kafka',
    'camel',
    'quarkus',
    'aws sqs'
  ],
  },
  {
  id: 'exp-2',
  title: 'Associate Software Engineer',
  period: '2024 - 2024',
  organization: 'Tech Mahindra',
  location: 'Chennai, India',
  description:
    'Contributed to the development and integration of an AI-powered testing platform for Mahindra & Mahindra, focusing on intelligent test automation, computer vision, and backend application development.',
  highlights: [
    'Developed AI-based testing modules to automate validation workflows and improve software testing efficiency.',
    'Integrated machine learning and OpenCV capabilities for image processing and intelligent defect detection.',
    'Built backend components, database integrations, and automation utilities using Java, Python, and MySQL.',
  ],
  skillsUsed: [
    'Python',
    'Machine Learning',
    'OpenCV',
    'Java',
    'MySQL',
    'Git',
    'Automation Testing',
  ],
  },
];

export const defaultProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Nexus Analytics - AI Cloud Dashboard',
    category: 'app',
    categoryLabel: 'Web Application',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Enterprise AI analytics suite featuring real-time data streaming, interactive widget dashboards, and dark mode theme.',
    fullDescription: 'Nexus Analytics is an award-winning SaaS platform designed for cloud metrics monitoring. Built with React 19, TypeScript, Tailwind CSS, and Recharts, it offers customizable grid widgets, automated PDF reporting, and instant search.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
    demoUrl: 'https://example.com/demo/nexus',
    githubUrl: 'https://github.com/example/nexus-analytics',
    client: 'Nexus Global Inc.',
    date: '2024',
  },
];

export const defaultServices: ServiceItem[] = [
 
];

export const defaultTestimonials: TestimonialItem[] = [
  {
  id: 'test-1',
  name: 'Maheswaran',
  role: 'Assistant Professor',
  company: 'Kongu Engineering College',
  avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  rating: 5,
  quote: 'Kasi consistently demonstrated a strong aptitude for software development and problem-solving. His dedication to learning new technologies, analytical thinking, and ability to deliver high-quality solutions make him a promising software engineer. I am confident he will excel in any professional environment.',
  },
 {
  id: 'test-2',
  name: 'Aravindhan',
  role: 'Senior Manager',
  company: 'Mahindra & Mahindra',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  rating: 5,
  quote: 'Kasi is a dedicated and disciplined individual who approaches every challenge with enthusiasm and determination. His eagerness to learn modern technologies, coupled with his technical foundation and professional attitude, will make him a valuable contributor to any engineering team.',
},
];
