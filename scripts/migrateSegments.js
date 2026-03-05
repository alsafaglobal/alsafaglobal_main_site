/**
 * Migration script to create Segment documents from segmentsPage.segments array
 * 
 * Usage:
 *   node scripts/migrateSegments.js
 * 
 * Environment variables required:
 *   SANITY_PROJECT_ID - Your Sanity project ID
 *   SANITY_DATASET - Dataset name (default: production)
 *   SANITY_TOKEN - Sanity auth token with write permissions
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
});

const slugify = (s) => {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'segment';
};

async function migrateSegments() {
  console.log('📋 Fetching segmentsPage document...');
  
  const segmentsPage = await client.fetch('*[_type == "segmentsPage"][0]');
  
  if (!segmentsPage) {
    console.error('❌ No segmentsPage document found.');
    process.exit(1);
  }
  
  const segments = segmentsPage.segments || [];
  if (segments.length === 0) {
    console.warn('⚠️  No segments found in segmentsPage.segments array.');
    process.exit(0);
  }
  
  console.log(`📊 Found ${segments.length} segments to migrate.\n`);
  
  let created = 0;
  let skipped = 0;
  
  for (const seg of segments) {
    const slug = (seg.slug && String(seg.slug).trim()) || slugify(seg.title);
    const title = seg.title || 'Untitled Segment';
    
    // Check if segment with this slug already exists
    const existing = await client.fetch('*[_type == "segment" && slug == $slug][0]', { slug });
    
    if (existing) {
      console.log(`⏭️  Skipping (already exists): ${title} (${slug})`);
      skipped++;
      continue;
    }
    
    // Create new segment document
    const newSegment = {
      _type: 'segment',
      title: title,
      slug: slug,
      description: seg.description || '',
      servicesTitle: seg.servicesTitle || 'Our Products & Services Include:',
      services: seg.services || []
    };
    
    try {
      const created_doc = await client.create(newSegment);
      console.log(`✅ Created: ${title} (${slug}) - ID: ${created_doc._id}`);
      created++;
    } catch (err) {
      console.error(`❌ Error creating ${title}:`, err.message);
    }
  }
  
  console.log(`\n✨ Migration complete!`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`\n🎬 Next steps:`);
  console.log(`   1. Go to Sanity Studio`);
  console.log(`   2. Edit Products Page`);
  console.log(`   3. Add a product and select from "Link to Segment" dropdown`);
  console.log(`   4. The segment titles should now appear!`);
}

migrateSegments()
  .then(() => {
    console.log('\n✅ Done.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
