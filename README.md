# Personal Website

A modern, responsive personal website built with Next.js, TailwindCSS, and Sanity.io.

## Features

- Modern, responsive design with dark mode support
- Blog with MDX support and code syntax highlighting
- Project showcase
- Contact form
- Content management with Sanity.io
- SEO optimized
- TypeScript support
- Tailwind CSS for styling

## Prerequisites

- Node.js 18 or later
- npm or yarn
- A Sanity.io account

## Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd personal-site
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file in the root directory and add your Sanity project credentials:
   \`\`\`
   NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_SANITY_DATASET="personal-site"
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. To access the Sanity Studio, visit [http://localhost:3000/studio](http://localhost:3000/studio)

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - React components
- `/src/utils` - Utility functions
- `/public` - Static assets
- `/sanity` - Sanity.io schema and configuration
- `/src/styles` - Global styles and Tailwind CSS configuration

## Deployment

The site can be easily deployed to Vercel:

1. Push your code to a Git repository
2. Import the project to Vercel
3. Add your environment variables
4. Deploy!

## Content Management

Content is managed through Sanity Studio. To add or edit content:

1. Navigate to `/studio` on your deployed site or locally
2. Log in with your Sanity credentials
3. Create and publish your content

## License

MIT
