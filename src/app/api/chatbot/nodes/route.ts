import { NextRequest, NextResponse } from 'next/server';
import { supabase, ChatbotNodeDB, isSupabaseConfigured } from '@/lib/supabase';
import { chatbotFlow } from '@/utils/flows';

// GET /api/chatbot/nodes - Fetch all nodes
export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn('⚠️ Supabase not configured, returning hardcoded flows');
      return NextResponse.json({ 
        success: true, 
        data: chatbotFlow,
        source: 'hardcoded'
      });
    }

    const { searchParams } = new URL(request.url);
    const flowType = searchParams.get('flow_type');

    let query = supabase.from('chatbot_nodes').select('*');
    
    if (flowType && flowType !== 'all') {
      query = query.or(`flow_type.eq.${flowType},flow_type.eq.shared`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Supabase error, falling back to hardcoded flows:', error);
      return NextResponse.json({ 
        success: true, 
        data: chatbotFlow,
        source: 'hardcoded',
        error: error.message
      });
    }

    // Convert array to object keyed by id
    const flowData = (data as ChatbotNodeDB[]).reduce((acc, node) => {
      acc[node.id] = {
        id: node.id,
        type: node.type as any,
        message: node.message,
        options: node.options || []
      };
      return acc;
    }, {} as Record<string, any>);

    console.log('✅ Successfully fetched nodes from Supabase:', Object.keys(flowData).length, 'nodes');

    return NextResponse.json({ 
      success: true, 
      data: flowData,
      source: 'supabase'
    });
  } catch (error: any) {
    console.error('❌ API error, falling back to hardcoded flows:', error);
    return NextResponse.json({ 
      success: true, 
      data: chatbotFlow,
      source: 'hardcoded',
      error: error.message
    });
  }
}

// POST /api/chatbot/nodes - Create new node
export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Supabase not configured' 
      }, { status: 503 });
    }

    const body = await request.json();
    const { id, type, message, options, flow_type } = body;

    if (!id || !type || !message) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: id, type, message' 
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('chatbot_nodes')
      .insert({
        id,
        type,
        message,
        options: options || null,
        flow_type: flow_type || 'shared'
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating node:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    console.log('✅ Created new node:', id);

    return NextResponse.json({ 
      success: true, 
      data 
    });
  } catch (error: any) {
    console.error('❌ API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

