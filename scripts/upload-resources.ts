import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Usage: npx tsx scripts/upload-resources.ts
// Ensure process.env.SANITY_API_TOKEN is set with write permissions.

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qyx6qjer',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

const RESOURCES = [
  {
    title: 'Plastic Raw Materials Overview',
    category: 'datasheets',
    description: 'A comprehensive overview of the raw materials, quality standards, and sourcing best practices.',
    file: 'Plastic Raw Materials Overview.pdf',
  },
  {
    title: 'Recycled Polymer Guide',
    category: 'datasheets',
    description: 'Breaking down the latest recycled polymer standards and how they affect procurement decisions.',
    file: 'Recycled Polymer Guide.pdf',
  },
  {
    title: 'Packaging Solutions Brochure',
    category: 'catalogues',
    description: 'A detailed brochure showcasing our complete line of industrial packaging solutions.',
    file: 'Packaging Solutions Brochure.pdf',
  },
  {
    title: 'Machinery Representation Overview',
    category: 'machinery',
    description: 'Quick-reference guide covering our represented machinery brands and technical capabilities.',
    file: 'Machinery Representation Overview.pdf',
  },
  {
    title: 'Supply Chain Consulting Guide',
    category: 'consulting',
    description: 'An analysis of demand trends, logistics, and supply chain consulting services.',
    file: 'Supply Chain Consulting Guide.pdf',
  },
  {
    title: 'Sustainability Commitment Statement',
    category: 'sustainability',
    description: 'Our commitment to sustainable practices, reducing carbon footprint, and circular economy.',
    file: 'Sustainability Commitment Statement.pdf',
  },
];

async function main() {
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN === 'your_sanity_api_token_here') {
    console.error('Error: Invalid or missing SANITY_API_TOKEN. Please update your .env.local file with a valid token before running this script.');
    process.exit(1);
  }

  console.log('Connecting to Sanity...');
  
  for (const res of RESOURCES) {
    const filePath = path.join(__dirname, '../public/resources', res.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Uploading ${res.file}...`);
    try {
      const asset = await client.assets.upload('file', fs.createReadStream(filePath), {
        filename: res.file,
      });

      console.log(`Creating document for ${res.title}...`);
      await client.create({
        _type: 'resource',
        title: res.title,
        category: res.category,
        description: res.description,
        gated: res.category === 'consulting', // Just an example
        published: true,
        publishedAt: new Date().toISOString(),
        file: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      });

      console.log(`Successfully processed ${res.title}`);
    } catch (error: any) {
      console.error(`Failed to process ${res.title}:`, error.message);
    }
  }

  console.log('Finished uploading resources.');
}

main().catch(console.error);
