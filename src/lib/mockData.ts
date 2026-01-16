// Mock Data for Malaysian Corporate Training Platform
// Context: HRD Corp registered training provider

export interface Course {
  id: string;
  title: string;
  category: string;
  price: number;
  is_hrd_claimable: boolean;
  next_date: string;
  seats_left: number;
  description: string;
  duration: string;
  location: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  curriculum: string[];
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  image_url: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
}

export interface Review {
  id: string;
  author: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  course_id: string;
  date: string;
  avatar?: string;
}

export interface Stat {
  label: string;
  value: string;
  description: string;
}

export const COURSES: Course[] = [
  {
    id: 'esg-reporting-workshop',
    title: 'ESG Reporting Workshop',
    category: 'Sustainability',
    price: 2500,
    is_hrd_claimable: true,
    next_date: '2026-02-15',
    seats_left: 3,
    description: 'Master Environmental, Social, and Governance (ESG) reporting standards for Malaysian corporations. Learn Bursa Malaysia Sustainability Reporting Framework, GRI Standards, and TCFD recommendations.',
    duration: '2 Days',
    location: 'Kuala Lumpur',
    level: 'Advanced',
    curriculum: [
      'Introduction to ESG Framework in Malaysia',
      'Bursa Malaysia Sustainability Reporting Requirements',
      'GRI Standards Deep Dive',
      'TCFD Climate-Related Financial Disclosures',
      'Materiality Assessment Workshop',
      'Data Collection & Verification',
      'Case Study: Malaysian PLCs',
      'Hands-on Report Writing'
    ],
    image: '/courses/esg.jpg'
  },
  {
    id: 'advanced-leadership-manufacturing',
    title: 'Advanced Leadership for Manufacturing',
    category: 'Leadership',
    price: 3200,
    is_hrd_claimable: true,
    next_date: '2026-02-22',
    seats_left: 8,
    description: 'Transform your manufacturing operations with cutting-edge leadership strategies. Designed for plant managers and operations directors in Malaysia\'s industrial sector.',
    duration: '3 Days',
    location: 'Penang',
    level: 'Advanced',
    curriculum: [
      'Industry 4.0 Leadership Mindset',
      'Lean Manufacturing Principles',
      'Managing Multi-Generational Workforce',
      'Safety Culture & Compliance',
      'Digital Transformation Strategies',
      'Change Management in Operations',
      'Performance Metrics & KPIs',
      'Site Visit: Smart Factory'
    ],
    image: '/courses/leadership.jpg'
  },
  {
    id: 'ai-for-hr-managers',
    title: 'AI for HR Managers',
    category: 'Technology',
    price: 1800,
    is_hrd_claimable: true,
    next_date: '2026-03-05',
    seats_left: 12,
    description: 'Leverage artificial intelligence to revolutionize your HR operations. From recruitment automation to predictive analytics for employee retention.',
    duration: '2 Days',
    location: 'Kuala Lumpur',
    level: 'Intermediate',
    curriculum: [
      'AI Fundamentals for Non-Technical Leaders',
      'AI-Powered Recruitment Tools',
      'Chatbots for Employee Engagement',
      'Predictive Analytics for Attrition',
      'Ethical AI in HR Decisions',
      'Malaysian PDPA Compliance',
      'Hands-on: Building HR Chatbot',
      'Implementation Roadmap'
    ],
    image: '/courses/ai-hr.jpg'
  },
  {
    id: 'digital-marketing-sme',
    title: 'Digital Marketing Mastery for SMEs',
    category: 'Marketing',
    price: 1500,
    is_hrd_claimable: true,
    next_date: '2026-03-12',
    seats_left: 15,
    description: 'Practical digital marketing strategies tailored for Malaysian SMEs. Master social media, SEO, and paid advertising on a budget.',
    duration: '2 Days',
    location: 'Johor Bahru',
    level: 'Beginner',
    curriculum: [
      'Digital Marketing Landscape in Malaysia',
      'Social Media Strategy (FB, IG, TikTok)',
      'Search Engine Optimization Basics',
      'Google Ads & Meta Ads',
      'Content Marketing That Converts',
      'Email Marketing Automation',
      'Analytics & ROI Measurement',
      'Building Your 90-Day Plan'
    ],
    image: '/courses/digital-marketing.jpg'
  },
  {
    id: 'financial-modelling-excel',
    title: 'Financial Modelling with Excel',
    category: 'Finance',
    price: 2200,
    is_hrd_claimable: true,
    next_date: '2026-03-18',
    seats_left: 6,
    description: 'Build professional financial models for investment analysis, business valuation, and corporate planning. MIA CPD accredited program.',
    duration: '3 Days',
    location: 'Kuala Lumpur',
    level: 'Intermediate',
    curriculum: [
      'Financial Modelling Best Practices',
      'Building Integrated Financial Statements',
      'Discounted Cash Flow (DCF) Analysis',
      'Sensitivity & Scenario Analysis',
      'Valuation Techniques',
      'M&A Modelling Basics',
      'Dashboard & Visualization',
      'Model Audit & Documentation'
    ],
    image: '/courses/finance.jpg'
  },
  {
    id: 'effective-communication-leaders',
    title: 'Effective Communication for Leaders',
    category: 'Soft Skills',
    price: 1200,
    is_hrd_claimable: true,
    next_date: '2026-03-25',
    seats_left: 20,
    description: 'Enhance your executive presence and communication skills. Learn to inspire teams, handle difficult conversations, and present with confidence.',
    duration: '1 Day',
    location: 'Kuala Lumpur',
    level: 'Beginner',
    curriculum: [
      'The Science of Persuasion',
      'Active Listening Techniques',
      'Delivering Feedback Effectively',
      'Managing Difficult Conversations',
      'Presentation Skills Workshop',
      'Cross-Cultural Communication',
      'Virtual Communication Excellence',
      'Personal Action Plan'
    ],
    image: '/courses/communication.jpg'
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Dr. Aisha Razali',
    role: 'ESG & Sustainability Expert',
    image_url: '/trainers/aisha.jpg',
    bio: 'Former Head of Sustainability at a leading Malaysian GLC with 15 years of experience. PhD in Environmental Management from University of Malaya. Certified GRI Professional.',
    expertise: ['ESG Reporting', 'Sustainability Strategy', 'Climate Risk Assessment', 'Bursa Malaysia Compliance'],
    linkedin: 'https://linkedin.com/in/aisha-razali'
  },
  {
    id: 'trainer-2',
    name: 'Encik Ahmad Faizal',
    role: 'Manufacturing & Operations Leader',
    image_url: '/trainers/ahmad.jpg',
    bio: '25 years in manufacturing leadership across automotive and electronics sectors. Former Plant Director at a Fortune 500 company. Certified Six Sigma Black Belt and Lean Master.',
    expertise: ['Lean Manufacturing', 'Industry 4.0', 'Operations Excellence', 'Leadership Development'],
    linkedin: 'https://linkedin.com/in/ahmad-faizal'
  },
  {
    id: 'trainer-3',
    name: 'Ms. Rachel Tan',
    role: 'HR Technology Specialist',
    image_url: '/trainers/rachel.jpg',
    bio: 'Pioneer in HR digital transformation with experience implementing AI solutions for multinational corporations in ASEAN. SHRM-SCP certified with an MBA from NUS.',
    expertise: ['HR Analytics', 'AI in HR', 'Digital Transformation', 'Change Management'],
    linkedin: 'https://linkedin.com/in/rachel-tan'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'review-1',
    author: 'Dato\' Siti Hasmah',
    company: 'Petronas',
    role: 'Head of Sustainability',
    content: 'The ESG Workshop transformed our reporting approach. Dr. Aisha\'s practical insights helped us achieve compliance ahead of schedule. Highly recommended for any PLC.',
    rating: 5,
    course_id: 'esg-reporting-workshop',
    date: '2025-11-20'
  },
  {
    id: 'review-2',
    author: 'Mr. Lee Wei Kang',
    company: 'Intel Malaysia',
    role: 'Operations Director',
    content: 'Encik Ahmad\'s leadership program was exactly what our team needed. The factory visit component made concepts tangible. Worth every ringgit.',
    rating: 5,
    course_id: 'advanced-leadership-manufacturing',
    date: '2025-10-15'
  },
  {
    id: 'review-3',
    author: 'Puan Nur Fatimah',
    company: 'Maybank',
    role: 'VP Human Resources',
    content: 'Rachel\'s AI for HR course opened our eyes to possibilities we hadn\'t considered. We\'ve already implemented two chatbot solutions from the workshop.',
    rating: 5,
    course_id: 'ai-for-hr-managers',
    date: '2025-12-01'
  },
  {
    id: 'review-4',
    author: 'En. Mohd Rizal',
    company: 'SME Corp Malaysia',
    role: 'CEO',
    content: 'As an SME owner, the Digital Marketing course was a game-changer. Practical, budget-friendly strategies that I could implement immediately.',
    rating: 4,
    course_id: 'digital-marketing-sme',
    date: '2025-09-28'
  },
  {
    id: 'review-5',
    author: 'Ms. Priya Subramaniam',
    company: 'CIMB',
    role: 'Senior Financial Analyst',
    content: 'The Financial Modelling course exceeded expectations. The Excel templates alone are worth the investment. Very hands-on and practical.',
    rating: 5,
    course_id: 'financial-modelling-excel',
    date: '2025-11-08'
  }
];

export const STATS: Stat[] = [
  {
    label: 'Corporate Clients',
    value: '250+',
    description: 'Malaysian companies trust us'
  },
  {
    label: 'Professionals Trained',
    value: '12,000+',
    description: 'Since 2018'
  },
  {
    label: 'Satisfaction Rate',
    value: '98%',
    description: 'Would recommend to colleagues'
  },
  {
    label: 'HRD Corp Programs',
    value: '45+',
    description: 'Registered courses'
  }
];

export const CATEGORIES = [
  'All',
  'Sustainability',
  'Leadership',
  'Technology',
  'Marketing',
  'Finance',
  'Soft Skills'
];

export const LOCATIONS = [
  'All Locations',
  'Kuala Lumpur',
  'Penang',
  'Johor Bahru'
];

// Dashboard mock data
export const DASHBOARD_STATS = {
  totalLeads: 847,
  proformaGenerated: 234,
  conversionRate: 27.6,
  revenue: 425000,
  trafficSources: [
    { source: 'LinkedIn', visits: 3420, leads: 312 },
    { source: 'Google Organic', visits: 2890, leads: 245 },
    { source: 'Direct', visits: 1560, leads: 156 },
    { source: 'Email Campaign', visits: 980, leads: 89 },
    { source: 'Facebook', visits: 650, leads: 45 }
  ],
  monthlyLeads: [
    { month: 'Aug', leads: 65 },
    { month: 'Sep', leads: 78 },
    { month: 'Oct', leads: 92 },
    { month: 'Nov', leads: 124 },
    { month: 'Dec', leads: 156 },
    { month: 'Jan', leads: 187 }
  ],
  topCourses: [
    { name: 'ESG Reporting Workshop', enrollments: 89 },
    { name: 'AI for HR Managers', enrollments: 76 },
    { name: 'Financial Modelling', enrollments: 64 },
    { name: 'Leadership Manufacturing', enrollments: 52 },
    { name: 'Digital Marketing SME', enrollments: 48 }
  ]
};

// ==========================================
// CONTENT MANAGEMENT SYSTEM (CMS) MOCK DATA
// ==========================================

export type ContentStatus = 'draft' | 'review' | 'published' | 'scheduled' | 'archived';
export type ContentType = 'article' | 'case-study' | 'whitepaper' | 'linkedin-post' | 'newsletter';
export type ContentFreshness = 'fresh' | 'aging' | 'stale' | 'evergreen';

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  status: ContentStatus;
  author: string;
  category: string;
  industry: string[];
  seniorityLevel: string[];
  excerpt: string;
  content: string;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  tags: string[];
  publishedAt?: string;
  scheduledAt?: string;
  lastUpdated: string;
  createdAt: string;
  views: number;
  shares: number;
  leads: number;
  freshness: ContentFreshness;
  freshnessScore: number; // 0-100
  distributionChannels: string[];
  aiGenerated: boolean;
}

export interface DistributionChannel {
  id: string;
  name: string;
  type: 'social' | 'email' | 'website';
  icon: string;
  connected: boolean;
  autoPublish: boolean;
  lastSynced?: string;
  followers?: number;
}

export interface AIPromptTemplate {
  id: string;
  name: string;
  description: string;
  promptTemplate: string;
  outputType: ContentType;
}

export const CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'content-1',
    title: 'ESG Reporting: A Complete Guide for Malaysian PLCs in 2026',
    slug: 'esg-reporting-guide-malaysian-plcs-2026',
    type: 'whitepaper',
    status: 'published',
    author: 'Dr. Aisha Razali',
    category: 'Sustainability',
    industry: ['Manufacturing', 'Finance', 'Energy'],
    seniorityLevel: ['C-Suite', 'Director', 'Manager'],
    excerpt: 'Navigate the new Bursa Malaysia sustainability reporting requirements with our comprehensive guide covering GRI Standards, TCFD, and practical implementation steps.',
    content: 'Full whitepaper content here...',
    seoMetaTitle: 'ESG Reporting Guide 2026 | Malaysian PLCs | Bursa Malaysia Compliance',
    seoMetaDescription: 'Master ESG reporting for Malaysian PLCs. Learn Bursa Malaysia requirements, GRI Standards, and TCFD frameworks. Download free guide.',
    tags: ['ESG', 'Sustainability', 'Bursa Malaysia', 'GRI', 'TCFD', 'Compliance'],
    publishedAt: '2025-12-15',
    lastUpdated: '2025-12-15',
    createdAt: '2025-11-20',
    views: 2456,
    shares: 189,
    leads: 67,
    freshness: 'fresh',
    freshnessScore: 95,
    distributionChannels: ['LinkedIn', 'Email Newsletter', 'Website'],
    aiGenerated: false
  },
  {
    id: 'content-2',
    title: '5 Ways AI is Transforming HR in Malaysian Companies',
    slug: 'ai-transforming-hr-malaysia',
    type: 'article',
    status: 'published',
    author: 'Ms. Rachel Tan',
    category: 'Technology',
    industry: ['All Industries'],
    seniorityLevel: ['HR Manager', 'CHRO', 'Director'],
    excerpt: 'Discover how leading Malaysian organizations are leveraging AI for recruitment, employee engagement, and predictive analytics.',
    content: 'Full article content here...',
    seoMetaTitle: 'AI in HR Malaysia | 5 Transformative Use Cases for 2026',
    seoMetaDescription: 'Learn how Malaysian companies use AI in HR: recruitment automation, chatbots, predictive analytics. Real case studies inside.',
    tags: ['AI', 'HR Technology', 'Digital Transformation', 'Automation'],
    publishedAt: '2025-11-28',
    lastUpdated: '2025-11-28',
    createdAt: '2025-11-15',
    views: 1823,
    shares: 234,
    leads: 45,
    freshness: 'fresh',
    freshnessScore: 88,
    distributionChannels: ['LinkedIn', 'Website'],
    aiGenerated: false
  },
  {
    id: 'content-3',
    title: 'Leadership in the Age of Industry 4.0: Lessons from Penang\'s Manufacturing Giants',
    slug: 'leadership-industry-4-penang-manufacturing',
    type: 'case-study',
    status: 'published',
    author: 'Encik Ahmad Faizal',
    category: 'Leadership',
    industry: ['Manufacturing', 'Electronics', 'Automotive'],
    seniorityLevel: ['Plant Manager', 'Operations Director', 'C-Suite'],
    excerpt: 'How three Penang-based manufacturers transformed their leadership culture to thrive in the digital age.',
    content: 'Full case study content here...',
    seoMetaTitle: 'Industry 4.0 Leadership Case Study | Penang Manufacturing',
    seoMetaDescription: 'Real case studies from Penang manufacturers on digital transformation leadership. Download insights from Intel, Bosch, and more.',
    tags: ['Leadership', 'Industry 4.0', 'Manufacturing', 'Digital Transformation', 'Penang'],
    publishedAt: '2025-09-10',
    lastUpdated: '2025-09-10',
    createdAt: '2025-08-20',
    views: 1245,
    shares: 156,
    leads: 34,
    freshness: 'aging',
    freshnessScore: 62,
    distributionChannels: ['LinkedIn', 'Email Newsletter', 'Website'],
    aiGenerated: false
  },
  {
    id: 'content-4',
    title: 'Quick Tips: Preparing Your Team for ESG Audits',
    slug: 'quick-tips-esg-audit-preparation',
    type: 'linkedin-post',
    status: 'scheduled',
    author: 'Dr. Aisha Razali',
    category: 'Sustainability',
    industry: ['All Industries'],
    seniorityLevel: ['Manager', 'Director'],
    excerpt: '🌱 ESG audit season is coming! Here are 5 quick wins to prepare your team...',
    content: 'LinkedIn post content here...',
    tags: ['ESG', 'Audit', 'Quick Tips'],
    scheduledAt: '2026-01-20T09:00:00',
    lastUpdated: '2026-01-15',
    createdAt: '2026-01-15',
    views: 0,
    shares: 0,
    leads: 0,
    freshness: 'fresh',
    freshnessScore: 100,
    distributionChannels: ['LinkedIn'],
    aiGenerated: true
  },
  {
    id: 'content-5',
    title: 'The Complete Guide to HRD Corp Claims for Training Programs',
    slug: 'hrd-corp-claims-guide',
    type: 'article',
    status: 'published',
    author: 'Admin Team',
    category: 'Resources',
    industry: ['All Industries'],
    seniorityLevel: ['HR Manager', 'L&D Manager', 'Admin'],
    excerpt: 'Everything you need to know about claiming training expenses through HRD Corp levy.',
    content: 'Full guide content here...',
    seoMetaTitle: 'HRD Corp Claims Guide 2026 | Step-by-Step Process',
    seoMetaDescription: 'Complete guide to HRD Corp training claims. Learn eligibility, process, documentation requirements. Updated for 2026.',
    tags: ['HRD Corp', 'Training', 'Claims', 'Guide'],
    publishedAt: '2024-06-15',
    lastUpdated: '2024-06-15',
    createdAt: '2024-05-01',
    views: 8934,
    shares: 567,
    leads: 234,
    freshness: 'stale',
    freshnessScore: 28,
    distributionChannels: ['Website', 'Email Newsletter'],
    aiGenerated: false
  },
  {
    id: 'content-6',
    title: 'January 2026 Training Calendar & Early Bird Offers',
    slug: 'january-2026-training-calendar',
    type: 'newsletter',
    status: 'draft',
    author: 'Marketing Team',
    category: 'Promotions',
    industry: ['All Industries'],
    seniorityLevel: ['All Levels'],
    excerpt: 'Start 2026 strong! Check out our January programs with exclusive early bird discounts.',
    content: 'Newsletter content here...',
    tags: ['Newsletter', 'Promotions', 'Calendar'],
    lastUpdated: '2026-01-14',
    createdAt: '2026-01-14',
    views: 0,
    shares: 0,
    leads: 0,
    freshness: 'fresh',
    freshnessScore: 100,
    distributionChannels: ['Email Newsletter'],
    aiGenerated: false
  },
  {
    id: 'content-7',
    title: 'Financial Modelling Best Practices for M&A Transactions',
    slug: 'financial-modelling-ma-best-practices',
    type: 'whitepaper',
    status: 'review',
    author: 'Finance Team',
    category: 'Finance',
    industry: ['Finance', 'Investment', 'Consulting'],
    seniorityLevel: ['Analyst', 'Manager', 'Director'],
    excerpt: 'Advanced techniques for building robust financial models for mergers and acquisitions.',
    content: 'Whitepaper content here...',
    tags: ['Financial Modelling', 'M&A', 'Excel', 'Valuation'],
    lastUpdated: '2026-01-10',
    createdAt: '2026-01-05',
    views: 0,
    shares: 0,
    leads: 0,
    freshness: 'fresh',
    freshnessScore: 100,
    distributionChannels: ['LinkedIn', 'Website', 'Email Newsletter'],
    aiGenerated: false
  }
];

export const DISTRIBUTION_CHANNELS: DistributionChannel[] = [
  {
    id: 'channel-1',
    name: 'LinkedIn Company Page',
    type: 'social',
    icon: 'Linkedin',
    connected: true,
    autoPublish: true,
    lastSynced: '2026-01-16T08:00:00',
    followers: 12450
  },
  {
    id: 'channel-2',
    name: 'Email Newsletter',
    type: 'email',
    icon: 'Mail',
    connected: true,
    autoPublish: false,
    lastSynced: '2026-01-15T14:30:00',
    followers: 8920
  },
  {
    id: 'channel-3',
    name: 'Facebook Business',
    type: 'social',
    icon: 'Facebook',
    connected: true,
    autoPublish: false,
    lastSynced: '2026-01-14T10:00:00',
    followers: 5670
  },
  {
    id: 'channel-4',
    name: 'Twitter/X',
    type: 'social',
    icon: 'Twitter',
    connected: false,
    autoPublish: false
  },
  {
    id: 'channel-5',
    name: 'Website Blog',
    type: 'website',
    icon: 'Globe',
    connected: true,
    autoPublish: true,
    lastSynced: '2026-01-16T09:00:00'
  }
];

export const AI_PROMPT_TEMPLATES: AIPromptTemplate[] = [
  {
    id: 'template-1',
    name: 'LinkedIn Post from Article',
    description: 'Convert a long-form article into an engaging LinkedIn post',
    promptTemplate: 'Transform this article into a compelling LinkedIn post (max 1300 characters). Include: hook, 3-5 key points with emojis, call-to-action. Tone: Professional yet approachable. Article: {content}',
    outputType: 'linkedin-post'
  },
  {
    id: 'template-2',
    name: 'SEO Meta Description',
    description: 'Generate SEO-optimized meta description',
    promptTemplate: 'Write an SEO meta description (max 160 characters) for this content. Include primary keyword and call-to-action. Content title: {title}. Content: {excerpt}',
    outputType: 'article'
  },
  {
    id: 'template-3',
    name: 'Article Title Ideas',
    description: 'Brainstorm engaging article titles',
    promptTemplate: 'Generate 5 engaging article title options for a piece about: {topic}. Target audience: {audience}. Include power words, numbers where appropriate. Malaysian business context.',
    outputType: 'article'
  },
  {
    id: 'template-4',
    name: 'Newsletter Summary',
    description: 'Summarize content for newsletter inclusion',
    promptTemplate: 'Summarize this content in 2-3 sentences for a newsletter. Highlight key value proposition and include a teaser. Content: {content}',
    outputType: 'newsletter'
  },
  {
    id: 'template-5',
    name: 'Case Study Outline',
    description: 'Create a case study structure',
    promptTemplate: 'Create a case study outline with sections: Challenge, Solution, Results, Key Takeaways. Context: {topic}. Industry: {industry}. Include suggested metrics to highlight.',
    outputType: 'case-study'
  }
];

export const CONTENT_CATEGORIES = [
  'All',
  'Sustainability',
  'Leadership',
  'Technology',
  'Marketing',
  'Finance',
  'Resources',
  'Promotions'
];

export const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: 'article', label: 'Article' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'whitepaper', label: 'Whitepaper' },
  { value: 'linkedin-post', label: 'LinkedIn Post' },
  { value: 'newsletter', label: 'Newsletter' }
];

export const CONTENT_STATUSES: { value: ContentStatus; label: string; color: string }[] = [
  { value: 'draft', label: 'Draft', color: 'slate' },
  { value: 'review', label: 'In Review', color: 'amber' },
  { value: 'scheduled', label: 'Scheduled', color: 'blue' },
  { value: 'published', label: 'Published', color: 'emerald' },
  { value: 'archived', label: 'Archived', color: 'gray' }
];

export const INDUSTRIES = [
  'All Industries',
  'Manufacturing',
  'Finance',
  'Technology',
  'Healthcare',
  'Energy',
  'Retail',
  'Consulting',
  'Government'
];

export const SENIORITY_LEVELS = [
  'All Levels',
  'C-Suite',
  'Director',
  'Manager',
  'Executive',
  'Entry Level'
];

// CMS Dashboard Stats
export const CMS_STATS = {
  totalContent: 47,
  publishedContent: 32,
  drafts: 8,
  scheduled: 4,
  inReview: 3,
  staleContent: 5,
  totalViews: 45678,
  totalLeads: 456,
  avgEngagement: 4.2,
  contentByType: [
    { type: 'Articles', count: 18 },
    { type: 'Case Studies', count: 8 },
    { type: 'Whitepapers', count: 6 },
    { type: 'LinkedIn Posts', count: 12 },
    { type: 'Newsletters', count: 3 }
  ],
  contentPerformance: [
    { month: 'Aug', views: 5200, leads: 45 },
    { month: 'Sep', views: 6100, leads: 52 },
    { month: 'Oct', views: 7800, leads: 68 },
    { month: 'Nov', views: 9200, leads: 89 },
    { month: 'Dec', views: 8900, leads: 94 },
    { month: 'Jan', views: 8478, leads: 108 }
  ]
};
