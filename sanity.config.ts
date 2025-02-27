'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { deskTool } from 'sanity/desk'
import { codeInput } from '@sanity/code-input'
import { type DocumentActionComponent } from 'sanity'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Personal Site',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    deskTool(),
    codeInput(),
  ],
  schema: {
    types: schema.types,
  },
  document: {
    actions: (prev) => {
      const publishAndRevalidate: DocumentActionComponent = (props) => {
        return {
          label: 'Publish and Revalidate',
          onHandle: async () => {
            // Get the document to revalidate
            const doc = props.draft || props.published;
            if (!doc) return;
            
            // Then trigger the revalidation webhook
            const webhookUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/revalidate`
              : 'http://localhost:3000/api/revalidate';
              
            try {
              const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-webhook-secret': process.env.SANITY_REVALIDATE_SECRET || '',
                },
                body: JSON.stringify(doc),
              });
              
              if (!response.ok) {
                throw new Error('Revalidation failed');
              }
            } catch (err) {
              console.error('Revalidation error:', err);
              throw new Error('Failed to revalidate');
            }
          },
          tone: 'positive'
        }
      }
      
      return [...prev, publishAndRevalidate]
    },
  },
})
