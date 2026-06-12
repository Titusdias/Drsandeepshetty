const { createClient } = require('next-sanity');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01'
});

async function main() {
  const result = await client.fetch('*[_type == "page" && slug.current == "contact"][0]');
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);