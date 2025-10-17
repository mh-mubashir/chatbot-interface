/**
 * Migration Script: Populate Supabase with Initial Flow Data
 * 
 * This script reads the hardcoded flows from flows.ts and populates
 * the Supabase database with all nodes.
 * 
 * Run this script ONCE after setting up your Supabase tables.
 * 
 * Usage: npm run migrate
 * Or: npx tsx scripts/migrate-to-supabase.ts
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

import { chatbotFlow } from '../src/utils/flows';

// You need to set these environment variables before running
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set');
  console.error('Please set them in your .env.local file');
  process.exit(1);
}

// Determine flow type based on node ID
function determineFlowType(nodeId: string): 'undergraduate' | 'graduate' | 'shared' {
  if (nodeId.startsWith('grad_')) return 'graduate';
  if (nodeId.startsWith('undergrad_')) return 'undergraduate';
  if (['entry', 'end', 'satisfaction', 'contact_support', 'grad_contact_support'].includes(nodeId)) {
    return 'shared';
  }
  
  // Check if node is reachable from undergraduate flow
  const undergradNodes = ['undergrad_main', 'advising_support', 'course_registration', 
    'degree_audit_grades_transcripts', 'academic_standards_policies', 'change_major_minor',
    'registration_preparation', 'registration_process', 'academic_advising', 'coe_tutoring',
    'disability_access', 'fyelic', 'knack_writing', 'neurodiversity', 'degree_audit', 
    'grades', 'transcripts', 'academic_standards', 'policies_procedures'];
  
  if (undergradNodes.some(id => nodeId.includes(id))) {
    return 'undergraduate';
  }
  
  return 'shared';
}

async function migrateData() {
  console.log('🚀 Starting migration to Supabase...\n');
  
  const nodes = Object.values(chatbotFlow);
  console.log(`📊 Found ${nodes.length} nodes to migrate\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const node of nodes) {
    try {
      const flowType = determineFlowType(node.id);
      
      console.log(`📝 Migrating node: ${node.id} (${flowType})`);
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/chatbot_nodes`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          id: node.id,
          type: node.type,
          message: node.message,
          options: node.options || null,
          flow_type: flowType
        })
      });
      
      if (response.ok || response.status === 201) {
        console.log(`   ✅ Successfully migrated: ${node.id}`);
        successCount++;
      } else {
        const errorText = await response.text();
        console.error(`   ❌ Failed to migrate ${node.id}: ${response.status} - ${errorText}`);
        errorCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error: any) {
      console.error(`   ❌ Error migrating ${node.id}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📈 Total: ${nodes.length}`);
  console.log('='.repeat(60) + '\n');
  
  if (successCount === nodes.length) {
    console.log('🎉 Migration completed successfully!');
    console.log('👉 You can now use the admin panel to manage your chatbot flows.');
  } else if (successCount > 0) {
    console.log('⚠️  Migration completed with some errors.');
    console.log('   Please check the errors above and retry if needed.');
  } else {
    console.log('❌ Migration failed completely.');
    console.log('   Please check your Supabase configuration and try again.');
  }
}

// Run migration
migrateData().catch(error => {
  console.error('❌ Fatal error during migration:', error);
  process.exit(1);
});

