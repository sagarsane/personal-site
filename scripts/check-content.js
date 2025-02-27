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

async function checkContent() {
  try {
    console.log("🔍 Checking Sanity content...");

    // Query for the About document
    const aboutQuery = '*[_type == "about"]';
    const aboutDocs = await client.fetch(aboutQuery);
    console.log("\nAbout documents found:", aboutDocs.length);
    console.log(JSON.stringify(aboutDocs, null, 2));

    // Query for all document types
    console.log("\nChecking all document types:");
    
    // Check each type individually
    const types = ['about', 'post', 'project', 'experience'];
    for (const type of types) {
      const query = `*[_type == "${type}"]`;
      const docs = await client.fetch(query);
      console.log(`${type}: ${docs.length} documents`);
    }

  } catch (error) {
    console.error("Error checking content:", error);
    process.exit(1);
  }
}

checkContent(); 