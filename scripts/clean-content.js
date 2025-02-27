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

async function cleanContent() {
  try {
    console.log("🧹 Cleaning existing content...");

    // Delete about page
    const aboutQuery = '*[_type == "about"]';
    const aboutDocs = await client.delete({query: aboutQuery});
    console.log("✅ About page content deleted");

    // Delete experience entries
    const experienceQuery = '*[_type == "experience"]';
    const experienceDocs = await client.delete({query: experienceQuery});
    console.log("✅ Experience entries deleted");

    // Delete project entries
    const projectQuery = '*[_type == "project"]';
    const projectDocs = await client.delete({query: projectQuery});
    console.log("✅ Project entries deleted");

    console.log("✨ Content cleanup complete!");
  } catch (error) {
    console.error("Error cleaning content:", error);
    process.exit(1);
  }
}

cleanContent(); 