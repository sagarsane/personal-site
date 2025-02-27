# Sagar's Personal Website

A modern, responsive personal website built with Next.js, TailwindCSS, and Sanity.io.

## Features

- Modern, responsive design with dark mode support using next-themes
- Dynamic content management with Sanity.io
- Server-side rendering with Next.js App Router
- Experience timeline with sorting and filtering
- Project showcase with image support
- Contact form with email integration using Resend
- SEO optimized with Next.js Metadata API
- TypeScript for type safety
- Tailwind CSS for styling with custom design system
- Comprehensive test coverage with Jest and React Testing Library
- Security headers and CSP configuration
- Responsive images with next/image optimization

## Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- A Sanity.io account
- A Resend account for email functionality

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

3. Create a `.env.local` file in the root directory and add your environment variables:
   \`\`\`

   # Sanity Configuration

   NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   SANITY_API_TOKEN="your-sanity-api-token"

   # Resend Configuration (for contact form)

   RESEND_API_KEY="your-resend-api-key"
   \`\`\`

   Note:

   - For local development, use `.env.local`
   - For production, add these variables in your Vercel project settings
   - Never commit your actual API keys to the repository

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. To access the Sanity Studio, visit [http://localhost:3000/studio](http://localhost:3000/studio)

## Project Structure

- `/src/app` - Next.js app router pages and layouts
  - `/(site)` - Main website routes
  - `/api` - API routes for contact form
  - `/studio` - Sanity Studio configuration
- `/src/components` - React components
  - `/sections` - Page-specific components
  - `/shared` - Reusable components
- `/src/lib` - Library code and configurations
  - `/sanity` - Sanity client and configurations
- `/src/types` - TypeScript type definitions
- `/public` - Static assets
- `/src/styles` - Global styles and Tailwind CSS configuration
- `/__tests__` - Test files and test utilities

## Testing

Run the test suite:
\`\`\`bash

# Run all tests

npm test

# Run tests in watch mode

npm run test:watch

# Generate coverage report

npm run test:coverage
\`\`\`

## Deployment

The site is optimized for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project to Vercel
3. Add your environment variables in Vercel dashboard:
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - NEXT_PUBLIC_SANITY_DATASET
   - SANITY_API_TOKEN
   - RESEND_API_KEY
4. Deploy!

## Content Management

Content is managed through Sanity Studio. To add or edit content:

1. Navigate to `/studio` on your deployed site or locally
2. Log in with your Sanity credentials
3. Create and publish your content

### Content Types

- Projects
- Experience
- About information
- Contact information

## Security

The site includes several security features:

- Content Security Policy (CSP) headers
- Strict CORS policies
- XSS protection
- Frame protection
- Secure environment variable handling

## Copyright

© 2025 Sagar Sane. All rights reserved.

This is a personal website and portfolio. The code and content are not licensed for reuse.
