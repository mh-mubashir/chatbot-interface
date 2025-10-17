import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// GET /api/chatbot/history/[nodeId] - Fetch history for a specific node
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ nodeId: string }> }
) {
  try {
    const { nodeId } = await params;
    
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Supabase not configured' 
      }, { status: 503 });
    }

    const { data, error } = await supabase
      .from('chatbot_nodes_history')
      .select('*')
      .eq('node_id', nodeId)
      .order('changed_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching history:', error);
      return NextResponse.json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }

    console.log(`✅ Fetched ${data.length} history records for node:`, nodeId);

    return NextResponse.json({ 
      success: true, 
      data 
    });
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

