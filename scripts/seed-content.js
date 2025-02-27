import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Initialize the client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-03-19',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const sampleExperience = {
  _type: "experience",
  company: "Tech Innovators Inc.",
  position: "Senior Software Engineer",
  startDate: "2020-01-01",
  current: true,
  location: "San Francisco, CA",
  description: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Led development of cloud-native applications and microservices architecture. Implemented CI/CD pipelines and automated testing frameworks.",
        },
      ],
    },
  ],
  technologies: [
    "React",
    "Node.js",
    "TypeScript",
    "AWS",
    "Docker",
    "Kubernetes",
  ],
  achievements: [
    "Reduced deployment time by 70% through CI/CD optimization",
    "Led team of 5 developers in major platform migration",
    "Implemented automated testing that increased code coverage to 90%",
  ],
  order: 1,
};

const sampleAbout = {
  _type: "about",
  _id: "aboutPage",
  bio: [
    {
      _type: "block",
      style: "normal",
      _key: "intro",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "intro-span",
          text: "I'm a passionate software engineer with over a decade of experience in building scalable web applications. My journey in technology has been driven by a constant desire to learn and create meaningful solutions.",
          marks: []
        }
      ]
    },
    {
      _type: "block",
      style: "normal",
      _key: "expertise",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "expertise-span",
          text: "Specializing in full-stack development, I have extensive experience with modern web technologies and cloud platforms. I'm passionate about creating performant, user-friendly applications that solve real-world problems.",
          marks: []
        }
      ]
    }
  ],
  skills: [
    {
      _key: "frontend",
      category: "Frontend Development",
      items: ["React", "Next.js", "TypeScript", "TailwindCSS", "HTML5/CSS3"]
    },
    {
      _key: "backend",
      category: "Backend Development",
      items: ["Node.js", "Python", "Java", "GraphQL", "RESTful APIs"]
    },
    {
      _key: "cloud",
      category: "Cloud & DevOps",
      items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Microservices"]
    },
    {
      _key: "databases",
      category: "Databases",
      items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"]
    }
  ],
  interests: [
    "Open Source Development",
    "Cloud Architecture",
    "Machine Learning",
    "Tech Mentoring",
    "Photography",
    "Travel"
  ],
  timeline: [
    {
      _key: "2024",
      year: "2024",
      title: "Lead Software Engineer",
      description: "Leading cloud transformation initiatives and mentoring development teams."
    },
    {
      _key: "2022",
      year: "2022",
      title: "Senior Software Engineer",
      description: "Architecting and developing scalable web applications using modern technologies."
    },
    {
      _key: "2020",
      year: "2020",
      title: "Full Stack Developer",
      description: "Building end-to-end solutions and implementing best practices in software development."
    }
  ]
};

const sampleBlogPost = {
  _type: "post",
  title: "Building a Modern Web Application with Next.js and Sanity",
  slug: {
    _type: "slug",
    current: "building-modern-web-app-nextjs-sanity",
  },
  publishedAt: new Date("2024-01-15T12:00:00Z").toISOString(),
  excerpt:
    "A comprehensive guide to creating a performant and maintainable web application using Next.js 14 and Sanity as a headless CMS.",
  body: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Next.js has revolutionized how we build React applications. Combined with Sanity's powerful content management capabilities, it creates an unbeatable stack for modern web development.",
        },
      ],
    },
    {
      _type: "block",
      style: "h2",
      children: [
        {
          _type: "span",
          text: "Why Next.js?",
        },
      ],
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Next.js provides an excellent developer experience with features like server-side rendering, static site generation, and API routes built-in.",
        },
      ],
    },
  ],
  tags: ["Next.js", "Sanity", "Web Development", "React"],
};

const sampleProjects = [
  {
    _type: "project",
    title: "Personal Portfolio Website",
    slug: {
      _type: "slug",
      current: "personal-portfolio-website",
    },
    description: "A modern, responsive portfolio website built with Next.js 14, TailwindCSS, and Sanity CMS. Features server components, dynamic content management, dark mode, and a responsive design.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Sanity.io",
      "Framer Motion"
    ],
    projectUrl: "https://sagarsane.com",
    githubUrl: "https://github.com/sagarsane/personal-site",
    featured: true,
    order: 1
  },
  {
    _type: "project",
    title: "AI-Powered Task Manager",
    slug: {
      _type: "slug",
      current: "ai-powered-task-manager",
    },
    description: "An intelligent task management application that uses AI to prioritize tasks, suggest optimal scheduling, and provide smart reminders. Built with a microservices architecture and real-time updates.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Docker",
      "OpenAI API"
    ],
    projectUrl: "https://taskmanager.demo.com",
    githubUrl: "https://github.com/demo/task-manager",
    featured: true,
    order: 2
  },
  {
    _type: "project",
    title: "E-commerce Analytics Dashboard",
    slug: {
      _type: "slug",
      current: "ecommerce-analytics-dashboard",
    },
    description: "A comprehensive analytics dashboard for e-commerce businesses. Features real-time sales tracking, inventory management, customer behavior analysis, and predictive analytics for future sales trends.",
    technologies: [
      "Vue.js",
      "Node.js",
      "MongoDB",
      "Redis",
      "AWS",
      "D3.js"
    ],
    projectUrl: "https://analytics.demo.com",
    githubUrl: "https://github.com/demo/analytics-dashboard",
    featured: true,
    order: 3
  }
];

async function seedContent() {
  try {
    console.log("🌱 Starting to seed content...");

    // Create About page content
    console.log("Creating About page content...");
    const aboutResult = await client.createOrReplace(sampleAbout);
    console.log("✅ About page created:", aboutResult._id);

    // Create Experience entry
    console.log("Creating Experience entry...");
    const experienceResult = await client.create(sampleExperience);
    console.log("✅ Experience entry created:", experienceResult._id);

    // Create Blog post
    console.log("Creating Blog post...");
    const blogResult = await client.create(sampleBlogPost);
    console.log("✅ Blog post created:", blogResult._id);

    // Create Projects
    console.log("Creating Project entries...");
    for (const project of sampleProjects) {
      const projectResult = await client.create(project);
      console.log("✅ Project created:", projectResult._id, "-", project.title);
    }

    console.log("✨ All content seeded successfully!");
  } catch (error) {
    console.error("Error seeding content:", error);
    process.exit(1);
  }
}

seedContent(); 