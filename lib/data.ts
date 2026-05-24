// ============================================================
// SINGLE SOURCE OF DATA - Portfolio Content
// Edit this file to update all content across the site
// ============================================================

export const personalData = {
  name: 'Singular_dev69',
  tagline: 'Software Engineer building products that scale.',
  email: 'harishsugandhi.work@gmail.com',
  location: 'India',
};

// ============================================================
// ABOUT SECTION
// ============================================================
export const aboutData = {
  intro: 'I am a software engineer who builds web applications that work well and scale. I focus on writing clean code and solving real problems for users.',
  philosophy: `Great software solves real problems. I write code that serves a purpose. Every feature should make life easier for the people who use it.

Technology is just a tool. The real skill is knowing which tool to use and how to use it well.`,
  whatIBuild: `I build full-stack web applications. Frontend with React and Next.js. Backend with APIs and databases. Systems that can handle thousands of users without breaking.

I work on products where design meets engineering. Things that feel good to use and work reliably under the hood.`,
  howIThink: `I start by understanding the problem. Why does this feature exist? Who will use it? What do they actually need?

Then I build it. I prefer working code over perfect plans. Ship fast, get feedback, and improve.

The best way to learn is by building things. Breaking things. Then fixing them better than before.`,
};

// ============================================================
// WHY WORK WITH ME
// ============================================================
export const whyWorkWithMeData = [
  {
    title: 'I ship code that works',
    description: 'I focus on getting things done. Working features. Tested code. Solutions that actually solve the problem.',
  },
  {
    title: 'I own my work',
    description: 'When I take on a task, I see it through. From first draft to deployment to bug fixes.',
  },
  {
    title: 'I communicate clearly',
    description: 'No jargon overload. I explain technical tradeoffs in plain English so everyone understands.',
  },
  {
    title: 'I learn fast',
    description: 'New tools, new domains, new challenges. I pick things up quickly and put them to use.',
  },
];

// ============================================================
// RESUME / EXPERIENCE
// ============================================================
export interface ExperienceItem {
  role: string;
  company: string;
  startDate: string; // ISO date string for client-side calculation
  description: string;
  achievements?: string[];
}

export const resumeData: ExperienceItem[] = [
  {
    role: 'Software Engineer',
    company: 'Stealth Company',
    startDate: '2024-03-01',
    description: 'Building products used by 200,000+ people. Working with multiple teams to ship features that matter.',
    achievements: [
      'Built SMTP product integrations with SendGrid, AWS, Gmail, and Brevo',
      'Contributed to ranking product serving 200K+ active users',
      'Collaborated with cross functional teams across multiple products',
      'Architected email infrastructure that handles high volume transactions',
    ],
  },
];

// ============================================================
// SKILLS
// ============================================================
export const skillsData = {
  frontend: [
    { name: 'React', description: 'Building interactive UIs with modern patterns' },
    { name: 'Next.js', description: 'Full stack React apps with server components' },
    { name: 'TypeScript', description: 'Type safe code that catches bugs early' },
    { name: 'Tailwind CSS', description: 'Fast styling without leaving HTML' },
  ],
  backend: [
    { name: 'Node.js', description: 'Scalable server side applications and APIs' },
    { name: 'Python', description: 'Scripting, automation, and backend services' },
    { name: 'PostgreSQL', description: 'Relational databases for structured data' },
    { name: 'Redis', description: 'Fast caching and real time data' },
  ],
  infrastructure: [
    { name: 'Docker', description: 'Containerized applications that run anywhere' },
    { name: 'AWS', description: 'Cloud services for hosting and storage' },
    { name: 'CI/CD', description: 'Automated testing and deployment pipelines' },
  ],
  currentlyLearning: [
    'DevOps and cloud architecture',
    'System design for scale',
  ],
};

// ============================================================
// PROJECTS
// ============================================================
export interface Project {
  slug: string;
  title: string;
  description: string;
  url: string;
  github?: string;
  tech: string[];
  status: 'live' | 'in-progress' | 'archived';
}

export const projectsData: Project[] = [
  {
    slug: 'images4fun',
    title: 'images4.fun',
    description: 'A browser-based image processing tool. Compress, crop, merge, and convert images — all client-side using WebAssembly. No uploads, no servers, completely private.',
    url: 'https://images4.fun',
    github: 'https://github.com/earth9890/images4fun',
    tech: ['Next.js', 'TypeScript', 'WebAssembly', 'Canvas API', 'Tailwind CSS'],
    status: 'live',
  },
];

// ============================================================
// BLOG POSTS
// ============================================================
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
}

export const blogPostsData: BlogPost[] = [
  {
    slug: 'engineering-craft',
    title: 'Engineering as Craft',
    date: 'January 15, 2025',
    excerpt: 'On the difference between building software and practicing craft.',
    category: 'Engineering',
    content: `Engineering is often taught as a problem-solving discipline: identify the problem, find the solution, implement it. But there's a dimension that gets less attention—the dimension of craft.

Craft isn't about solving problems. It's about how you solve them. It's the care you take in naming a variable. The time you spend considering edge cases that may never occur. The restraint to not add a feature because it doesn't belong.

## The Details Matter

In software, the details compound. A small inconsistency in your API becomes hours of debugging later. An unclear variable name becomes a source of bugs for the next person who touches the code. A missing transition makes your application feel sluggish.

Paying attention to details isn't pedantry. It's respect—respect for the people who will use what you build, and respect for the people who will maintain it.

## Taste Over Trends

Our industry moves quickly. New frameworks, new patterns, new ways of doing the same things. It's easy to get caught in the current, always reaching for the latest approach.

Craft requires taste—the ability to discern between what's new and what's better. Between what's popular and what's appropriate.

Sometimes the old way is the right way. Sometimes the new framework solves a real problem. The point isn't to be conservative or progressive—it's to think.

## Shipping with Care

There's tension between craft and shipping. Perfectionism can be a trap. The best work happens in the middle: shipping with conviction, but also with care.

Good enough to ship, but good enough to maintain. Fast enough to deliver, but thoughtful enough to endure.

## The Long Game

Craft pays dividends over time. Code written with care is easier to modify. Systems designed with thought adapt to new requirements. Interfaces built with consideration delight users and reduce support.

The immediate cost is higher. The long-term payoff is much higher.

Engineering as craft isn't about being slow. It's about being deliberate. And in a world of disposable software, that's increasingly valuable.`,
  },
  {
    slug: 'technical-debt',
    title: 'Technical Debt as Investment',
    date: 'Coming Soon',
    excerpt: 'A framework for thinking about when to accrue technical debt and when to pay it off.',
    category: 'Engineering',
    content: 'Coming soon...',
  },
  {
    slug: 'system-design',
    title: 'Systems Design for Small Teams',
    date: 'Coming Soon',
    excerpt: 'How to design scalable systems without over-engineering.',
    category: 'Engineering',
    content: 'Coming soon...',
  },
];

// ============================================================
// GOALS 2026
// ============================================================
export type GoalStatus = 'completed' | 'in-progress' | 'planned';

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: GoalStatus;
  progress: number;
  category: 'Engineering' | 'Learning' | 'Personal';
  current?: number; // Current progress value for client-side calculation
  target?: number; // Target value for client-side calculation
}

// Track current progress numbers (update these as you progress)
export const progressTracking = {
  twitter: { current: 1, target: 1000 },
  mediumBlogs: { current: 0, target: 36 },
};

export const goalsData: Goal[] = [
  {
    id: 'pers-1',
    title: 'Get 1000 Twitter followers',
    description: `Grow from ${progressTracking.twitter.current} to ${progressTracking.twitter.target} followers by end of 2026`,
    status: 'in-progress',
    progress: 0, // Calculated client-side
    category: 'Personal',
    current: progressTracking.twitter.current,
    target: progressTracking.twitter.target,
  },
  {
    id: 'pers-2',
    title: 'Publish 36 Medium blogs',
    description: `Write and publish 3 articles per month (${progressTracking.mediumBlogs.current}/${progressTracking.mediumBlogs.target} done)`,
    status: 'planned',
    progress: 0, // Calculated client-side
    category: 'Personal',
    current: progressTracking.mediumBlogs.current,
    target: progressTracking.mediumBlogs.target,
  },
  {
    id: 'eng-1',
    title: 'Launch Rank AI SAAS',
    description: 'Build and launch an AI-powered ranking tool as a service',
    status: 'in-progress',
    progress: 15,
    category: 'Engineering',
  },
  {
    id: 'learn-1',
    title: 'Learn DevOps',
    description: 'Master Docker, Kubernetes, CI/CD pipelines and cloud infrastructure',
    status: 'in-progress',
    progress: 20,
    category: 'Learning',
  },
];

// ============================================================
// SOCIAL / CONTACT
// ============================================================
export interface SocialLink {
  name: string;
  url: string;
  description: string;
  category: 'Code' | 'Writing' | 'Professional';
  icon?: 'GitHub' | 'GitLab' | 'Twitter' | 'LinkedIn' | 'Email' | 'Blog' | 'Instagram' | 'Medium';
}

export const socialLinksData: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/earth9890',
    description: 'Open source contributions and projects',
    category: 'Code',
    icon: 'GitHub',
  },
  {
    name: 'Twitter/X',
    url: 'https://x.com/Singular_dev69',
    description: 'Thoughts and links in 280 characters',
    category: 'Writing',
    icon: 'Twitter',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/harishsugandhi_',
    description: 'Visual updates and behind the scenes',
    category: 'Writing',
    icon: 'Instagram',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@singular_dev69',
    description: 'Long-form technical writing and essays',
    category: 'Writing',
    icon: 'Medium',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/harish-sugandhi-hds/',
    description: 'Professional history and recommendations',
    category: 'Professional',
    icon: 'LinkedIn',
  },
  {
    name: 'Email',
    url: 'mailto:harishsugandhi.work@gmail.com',
    description: 'Direct line for collaboration and conversation',
    category: 'Professional',
    icon: 'Email',
  },
];

// ============================================================
// NAVIGATION ITEMS (generated from data)
// ============================================================
export const navItems = [
  { href: '/', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'resume', label: 'Resume' },
  { href: 'projects', label: 'Projects' },
  { href: 'blog', label: 'Blog' },
  { href: 'goals', label: 'Goals' },
  { href: 'social', label: 'Connect' },
];
