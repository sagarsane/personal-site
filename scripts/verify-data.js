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

async function verifyData() {
  try {
    console.log("🔍 Verifying Sanity configuration and data access...");
    
    // Log configuration
    console.log("\nConfiguration:");
    console.log("Project ID:", process.env.SANITY_PROJECT_ID);
    console.log("Dataset:", process.env.SANITY_DATASET);
    
    // Get all documents
    console.log("\nFetching all documents...");
    const allDocs = await client.fetch(`
      *[] {
        _id,
        _type,
        _createdAt,
        _updatedAt
      }
    `);
    
    console.log("\nDocument count by type:");
    const typeCount = allDocs.reduce((acc, doc) => {
      acc[doc._type] = (acc[doc._type] || 0) + 1;
      return acc;
    }, {});
    console.log(typeCount);

    // Test About page query
    console.log("\nFetching About page data...");
    const aboutData = await client.fetch(`
      *[_type == "about"][0] {
        _id,
        _type,
        mainImage,
        bio,
        skills,
        interests,
        timeline
      }
    `);
    
    if (!aboutData) {
      console.log("❌ No About page data found");
      
      // Show all documents of type "about" without projection
      console.log("\nChecking raw about documents:");
      const rawAboutDocs = await client.fetch(`*[_type == "about"]`);
      console.log(JSON.stringify(rawAboutDocs, null, 2));
    } else {
      console.log("✅ About page data found");
      console.log("\nSections present:");
      console.log("- Bio:", !!aboutData.bio);
      console.log("- Skills:", aboutData.skills?.length || 0, "categories");
      console.log("- Interests:", aboutData.interests?.length || 0, "items");
      console.log("- Timeline:", aboutData.timeline?.length || 0, "entries");
    }
    
  } catch (error) {
    console.error("Error verifying data:", error);
    process.exit(1);
  }
}

verifyData(); 