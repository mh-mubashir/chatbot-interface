import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// GET /api/chatbot/nodes/[id] - Fetch single node
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Supabase not configured' 
      }, { status: 503 });
    }

    const { data, error } = await supabase
      .from('chatbot_nodes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ Error fetching node:', error);
      return NextResponse.json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 404 });
    }

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

// PUT /api/chatbot/nodes/[id] - Update node
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Supabase not configured' 
      }, { status: 503 });
    }

    const body = await request.json();
    const { type, message, options, flow_type } = body;

    // First, get the current node to save to history
    const { data: currentNode, error: fetchError } = await supabase
      .from('chatbot_nodes')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('❌ Error fetching current node for history:', fetchError);
    } else if (currentNode) {
      // Save to history
      const { error: historyError } = await supabase
        .from('chatbot_nodes_history')
        .insert({
          node_id: currentNode.id,
          type: currentNode.type,
          message: currentNode.message,
          options: currentNode.options,
          flow_type: currentNode.flow_type,
          changed_by: 'admin', // You can enhance this with actual user tracking
          changed_at: new Date().toISOString()
        });

      if (historyError) {
        console.error('❌ Error saving to history:', historyError);
      } else {
        console.log('✅ Saved node to history:', id);
      }
    }

    // Update the node
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    };

    if (type !== undefined) updateData.type = type;
    if (message !== undefined) updateData.message = message;
    if (options !== undefined) updateData.options = options;
    if (flow_type !== undefined) updateData.flow_type = flow_type;

    const { data, error } = await supabase
      .from('chatbot_nodes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Error updating node:', error);
      return NextResponse.json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }

    console.log('✅ Updated node:', id);

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

// DELETE /api/chatbot/nodes/[id] - Delete node and clean up references
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Supabase not configured' 
      }, { status: 503 });
    }

    // Step 1: Get all nodes to find references to this node
    const { data: allNodes, error: fetchError } = await supabase
      .from('chatbot_nodes')
      .select('*');

    if (fetchError) {
      console.error('❌ Error fetching nodes for cleanup:', fetchError);
      return NextResponse.json({ 
        success: false, 
        error: fetchError.message 
      }, { status: 500 });
    }

    // Step 2: Remove references to the deleted node from other nodes' options
    if (allNodes) {
      const nodesToUpdate: Array<{ id: string; options: { label: string; next: string }[] }> = [];
      
      for (const node of allNodes) {
        if (node.options && Array.isArray(node.options)) {
          // Filter out options that point to the node being deleted
          const updatedOptions = node.options.filter(
            (opt: { label: string; next: string }) => opt.next !== id
          );
          
          // If options changed, add to update list
          if (updatedOptions.length !== node.options.length) {
            nodesToUpdate.push({
              id: node.id,
              options: updatedOptions
            });
          }
        }
      }

      // Step 3: Update all nodes that referenced the deleted node
      for (const nodeUpdate of nodesToUpdate) {
        const { error: updateError } = await supabase
          .from('chatbot_nodes')
          .update({ 
            options: nodeUpdate.options,
            updated_at: new Date().toISOString()
          })
          .eq('id', nodeUpdate.id);

        if (updateError) {
          console.error(`❌ Error updating node ${nodeUpdate.id}:`, updateError);
        } else {
          console.log(`✅ Cleaned up references in node: ${nodeUpdate.id}`);
        }
      }

      if (nodesToUpdate.length > 0) {
        console.log(`🧹 Removed references to "${id}" from ${nodesToUpdate.length} node(s)`);
      }
    }

    // Step 4: Delete the actual node
    const { error: deleteError } = await supabase
      .from('chatbot_nodes')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('❌ Error deleting node:', deleteError);
      return NextResponse.json({ 
        success: false, 
        error: deleteError.message 
      }, { status: 500 });
    }

    console.log('✅ Deleted node:', id);

    return NextResponse.json({ 
      success: true,
      message: `Node deleted and cleaned up references from other nodes`
    });
  } catch (error) {
    console.error('❌ API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

