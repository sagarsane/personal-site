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

async function seedContent() {
  try {
    console.log("🌱 Seeding resume content...");

    // Create About page content
    const aboutContent = {
      _type: 'about',
      _id: 'aboutPage',
      bio: [
        {
          _type: 'block',
          style: 'normal',
          _key: 'intro',
          children: [
            {
              _type: 'span',
              text: '12+ years of experience in web experience management and web development, currently serving as a Principal Technical Architect at Adobe. Certified Adobe Experience Manager Sites Architect with extensive expertise in leading enterprise-level projects and development teams.',
              _key: 'intro-span',
              marks: []
            }
          ],
          markDefs: []
        }
      ],
      skills: [
        {
          _key: 'adobe',
          category: 'Adobe Technologies',
          items: [
            'Adobe Experience Manager',
            'Adobe Experience Cloud',
            'Adobe IO',
            'Adobe Commerce/Magento'
          ]
        },
        {
          _key: 'architecture',
          category: 'Architecture & Leadership',
          items: [
            'Technical Architecture',
            'Technical Leadership',
            'Technical Sales Consulting',
            'Enterprise Integration'
          ]
        },
        {
          _key: 'development',
          category: 'Development',
          items: [
            'Java',
            'JavaScript/ReactJS/NextJS',
            'Spring Framework',
            'REST & GraphQL',
            'JAMStack',
            'Cloud Native development'
          ]
        },
        {
          _key: 'databases',
          category: 'Databases & Storage',
          items: [
            'Java Content Repository (JCR)',
            'NoSQL',
            'MongoDB'
          ]
        },
        {
          _key: 'ai',
          category: 'AI & Modern Tech',
          items: [
            'Langchain',
            'OpenAI',
            'RAG Applications',
            'Google Firebase'
          ]
        }
      ],
      interests: [
        'Web Architecture',
        'Cloud Computing',
        'AI/ML Integration',
        'Technical Leadership',
        'Enterprise Solutions',
        'Developer Mentoring'
      ],
      timeline: [
        {
          _key: '2021',
          year: '2021',
          title: 'Principal Technical Architect at Adobe',
          description: 'Leading complex AEM implementations and integrations, bridging product and consulting teams.'
        },
        {
          _key: '2020',
          year: '2020',
          title: 'Senior Director, Architecture at Blue Acorn iCi',
          description: 'Led multiple Adobe Experience Cloud implementations and provided technical leadership across diverse projects.'
        },
        {
          _key: '2017',
          year: '2017',
          title: 'Technical Architect at Blue Acorn iCi',
          description: 'Led system design and technical implementation for enterprise-scale Adobe AEM projects.'
        },
        {
          _key: '2012',
          year: '2012',
          title: 'Masters in Computer Networking',
          description: 'Graduated from North Carolina State University'
        }
      ]
    };

    // Create or update About page
    await client.createOrReplace(aboutContent);
    console.log("✅ About page content created");

    // Create Experience entries
    const experiences = [
      {
        _type: 'experience',
        _id: 'adobe-principal',
        company: 'Adobe',
        position: 'Principal Technical Architect',
        location: 'Holly Springs, NC',
        startDate: '2021-08-09',
        current: true,
        description: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Lead AEM architect on complex implementations including AEM Cloud Service and integrations. Technical Delivery lead within Adobe Professional Services, bridging product and consulting teams.',
                marks: []
              }
            ]
          }
        ],
        achievements: [
          'Act as the primary / lead AEM architect on various complex AEM implementations',
          'Provide leadership between AEM Sites product and engineering teams and Adobe Consulting',
          'Co-presented at Adobe Summit 2023 on AEM+Adobe Commerce best practices'
        ],
        technologies: ['AEM Cloud Service', 'Adobe IO Runtime', 'Adobe Commerce Cloud', 'Adobe Marketing Cloud', 'Salesforce Marketing Cloud'],
        order: 1
      },
      {
        _type: 'experience',
        _id: 'bai-vp',
        company: 'Blue Acorn iCi',
        position: 'Vice President, Adobe Experience Cloud Practice',
        location: 'Raleigh, NC',
        startDate: '2021-01-03',
        endDate: '2021-08-06',
        current: false,
        description: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Led and directed team members responsible for Adobe Experience Cloud delivery and engineering management. Managed operations and contributed to strategic business development.',
                marks: []
              }
            ]
          }
        ],
        achievements: [
          'Led Adobe Experience Cloud practice delivery and engineering management',
          'Managed recruiting and growth within Adobe practice',
          'Contributed to sales and strategic business development',
          'Part of Sr. Leadership responsible for company growth and strategy'
        ],
        technologies: ['Adobe Experience Cloud', 'AEM', 'Technical Leadership', 'Strategic Planning'],
        order: 2
      },
      {
        _type: 'experience',
        _id: 'bai-director',
        company: 'Blue Acorn iCi',
        position: 'Senior Director, Architecture',
        location: 'Raleigh, NC',
        startDate: '2020-01-03',
        endDate: '2021-01-03',
        current: false,
        description: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Led multiple Adobe Experience Cloud implementations ensuring best practices. Provided technical leadership and guidance across diverse projects.',
                marks: []
              }
            ]
          }
        ],
        achievements: [
          'Led multiple Adobe Experience Cloud implementations',
          'Provided technical leadership on complex AEM projects',
          'Supported sales process as Senior Sales Engineer',
          'Led integration decisions between AEM and various systems'
        ],
        technologies: ['AEM', 'Adobe IO', 'Magento', 'Okta', 'Enterprise Integration'],
        order: 3
      }
    ];

    // Create or update Experience entries
    for (const exp of experiences) {
      await client.createOrReplace(exp);
    }
    console.log("✅ Experience entries created");

    // Create Projects
    const projects = [
      {
        _type: 'project',
        _id: 'aem-cloud-implementation',
        title: 'AEM Cloud Service Implementation Framework',
        slug: {
          _type: 'slug',
          current: 'aem-cloud-implementation'
        },
        description: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Developed and implemented best practices framework for AEM Cloud Service implementations, covering architecture patterns, performance optimization, and integration strategies. This framework has been adopted across multiple enterprise projects.',
                marks: []
              }
            ]
          }
        ],
        technologies: ['AEM Cloud Service', 'Adobe IO Runtime', 'Cloud Native Architecture', 'CI/CD'],
        link: 'https://business.adobe.com/products/experience-manager/cloud-service.html',
        featured: true
      },
      {
        _type: 'project',
        _id: 'adobe-commerce-aem',
        title: 'Adobe Commerce & AEM Integration Platform',
        slug: {
          _type: 'slug',
          current: 'adobe-commerce-aem'
        },
        description: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Led the development of a comprehensive integration platform between Adobe Commerce and AEM, presented at Adobe Summit 2023. The platform includes reusable components, performance optimizations, and architectural patterns for seamless e-commerce experiences.',
                marks: []
              }
            ]
          }
        ],
        technologies: ['Adobe Commerce', 'AEM', 'GraphQL', 'React', 'Adobe IO Events'],
        link: 'https://business.adobe.com/products/experience-manager/commerce.html',
        featured: true
      },
      {
        _type: 'project',
        _id: 'enterprise-architecture',
        title: 'Enterprise Architecture Framework',
        slug: {
          _type: 'slug',
          current: 'enterprise-architecture'
        },
        description: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Designed and implemented an enterprise architecture framework for large-scale Adobe Experience Cloud implementations. The framework includes patterns for system integration, performance optimization, and scalability.',
                marks: []
              }
            ]
          }
        ],
        technologies: ['Adobe Experience Cloud', 'Enterprise Integration', 'Microservices', 'Cloud Architecture'],
        featured: true
      }
    ];

    // Create or update Projects
    for (const project of projects) {
      await client.createOrReplace(project);
    }
    console.log("✅ Projects created");

  } catch (error) {
    console.error("Error seeding content:", error);
    process.exit(1);
  }
}

seedContent(); 