import { createClient } from '@supabase/supabase-js';
import { FlowNode } from '../utils/flows';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ChatbotNodeDB {
  id: string;
  type: string;
  message: string;
  options: { label: string; next: string }[] | null;
  flow_type: 'undergraduate' | 'graduate' | 'shared';
  created_at: string;
  updated_at: string;
}

export interface ChatbotNodeHistoryDB {
  id: string;
  node_id: string;
  type: string;
  message: string;
  options: { label: string; next: string }[] | null;
  flow_type: 'undergraduate' | 'graduate' | 'shared';
  changed_by: string | null;
  changed_at: string;
}

// Helper to convert DB format to FlowNode format
export function dbNodeToFlowNode(dbNode: ChatbotNodeDB): FlowNode {
  return {
    id: dbNode.id,
    type: dbNode.type as FlowNode['type'],
    message: dbNode.message,
    options: dbNode.options || []
  };
}

// Helper to convert FlowNode to DB format
export function flowNodeToDBNode(flowNode: FlowNode, flowType: 'undergraduate' | 'graduate' | 'shared'): Omit<ChatbotNodeDB, 'created_at' | 'updated_at'> {
  return {
    id: flowNode.id,
    type: flowNode.type,
    message: flowNode.message,
    options: flowNode.options || null,
    flow_type: flowType
  };
}

// Determine flow type based on node ID
export function determineFlowType(nodeId: string): 'undergraduate' | 'graduate' | 'shared' {
  if (nodeId.startsWith('grad_')) return 'graduate';
  if (nodeId.startsWith('undergrad_')) return 'undergraduate';
  if (['entry', 'end', 'satisfaction', 'contact_support', 'grad_contact_support'].includes(nodeId)) {
    return 'shared';
  }
  // Default based on first occurrence or pattern
  return 'shared';
}

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== 'your-project-url-here';
}

