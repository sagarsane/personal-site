import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-02-27',
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getFeaturedProjects() {
  return client.fetch(`
    *[_type == "project" && featured == true] | order(order asc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      projectUrl,
      githubUrl,
      technologies
    }
  `);
}

export async function getLatestPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt
    }
  `);
} 