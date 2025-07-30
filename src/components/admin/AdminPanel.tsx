"use client";
import React, { useState, useEffect } from 'react';
import { chatbotFlow as initialFlow, FlowNode, NodeType } from '../../utils/flows';

const typeColors: Record<NodeType, string> = {
  entry: 'bg-blue-100 text-blue-900 font-bold border border-blue-300',
  category: 'bg-blue-200 text-blue-900 font-bold border border-blue-400',
  sub_option: 'bg-yellow-100 text-yellow-900 font-bold border border-yellow-300',
  response: 'bg-green-100 text-green-900 font-bold border border-green-300',
  satisfaction: 'bg-purple-100 text-purple-900 font-bold border border-purple-300',
  end: 'bg-gray-700 text-white font-bold border border-gray-500',
};

const nodeTypes: NodeType[] = [
  'entry', 'category', 'sub_option', 'response', 'end'
];

type FlowType = 'undergraduate' | 'graduate';

export default function AdminPanel() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<FlowType>('undergraduate');
  
  // Initialize with initial flow, then load from localStorage in useEffect
  const [flow, setFlow] = useState<Record<string, FlowNode>>({ ...initialFlow });
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('entry');
  const [editNode, setEditNode] = useState<FlowNode | null>(initialFlow['entry']);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newNode, setNewNode] = useState<Partial<FlowNode> & { label?: string; next?: string }>({ type: 'category' });
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => setMounted(true), []);

  // Load flow from localStorage after component mounts
  useEffect(() => {
    const savedFlow = localStorage.getItem('chatbot-flow');
    if (savedFlow) {
      try {
        const parsedFlow = JSON.parse(savedFlow);
        setFlow(parsedFlow);
        console.log('Loaded saved flow from localStorage');
      } catch {
        console.log('Failed to parse saved flow, using initial flow');
      }
    }
  }, []);

  // Update editNode when selectedNodeId changes
  useEffect(() => {
    if (selectedNodeId && flow[selectedNodeId]) {
      const nodeData = { ...flow[selectedNodeId] };
      console.log('Updating editNode for:', selectedNodeId, nodeData); // Debug log
      setEditNode(nodeData);
    } else {
      console.log('No node found for ID:', selectedNodeId, 'Available nodes:', Object.keys(flow));
    }
  }, [selectedNodeId, flow]);

  // Debug: Log the current flow state
  useEffect(() => {
    console.log('Current flow:', flow);
    console.log('Selected node ID:', selectedNodeId);
    console.log('Edit node:', editNode);
  }, [flow, selectedNodeId, editNode]);

  if (!mounted) return null;

  // Helper: get all nodes as array
  const nodeList = Object.values(flow);

  // Helper: filter nodes by flow type
  const getFlowNodes = (flowType: FlowType) => {
    if (flowType === 'undergraduate') {
      // For undergraduate, only show nodes that are part of undergrad_main flow
      const undergradNodes = new Set(['undergrad_main']);
      
      // Add all nodes that can be reached from undergrad_main
      const addReachableNodes = (nodeId: string) => {
        const node = flow[nodeId];
        if (node && node.options) {
          node.options.forEach(option => {
            if (option.next && option.next !== 'entry' && option.next !== 'satisfaction') {
              undergradNodes.add(option.next);
              addReachableNodes(option.next);
            }
          });
        }
      };
      
      addReachableNodes('undergrad_main');
      return nodeList.filter(node => undergradNodes.has(node.id) && node.type !== 'satisfaction');
    } else {
      // For graduate, only show nodes that are part of grad_under_dev flow
      const gradNodes = new Set(['grad_under_dev']);
      
      // Add all nodes that can be reached from grad_under_dev
      const addReachableNodes = (nodeId: string) => {
        const node = flow[nodeId];
        if (node && node.options) {
          node.options.forEach(option => {
            if (option.next && option.next !== 'entry' && option.next !== 'satisfaction') {
              gradNodes.add(option.next);
              addReachableNodes(option.next);
            }
          });
        }
      };
      
      addReachableNodes('grad_under_dev');
      return nodeList.filter(node => gradNodes.has(node.id) && node.type !== 'satisfaction');
    }
  };

  // Helper: render tree recursively
  const renderTree = (nodeId: string, depth = 0, visited = new Set<string>()) => {
    if (visited.has(nodeId)) return null; // Prevent infinite recursion
    visited.add(nodeId);
    const node = flow[nodeId];
    if (!node) return null;

    // Skip satisfaction nodes in the editor
    if (node.type === 'satisfaction') return null;

    return (
      <div key={nodeId} style={{ marginLeft: depth * 16 }}>
        <div
          className={`p-3 mb-2 rounded-lg cursor-pointer flex items-center gap-2 transition-all hover:shadow-md ${typeColors[node.type]} ${selectedNodeId === nodeId ? 'ring-2 ring-blue-400 shadow-lg' : ''}`}
          onClick={() => {
            console.log('Clicked node:', nodeId, node); // Debug log
            setSelectedNodeId(nodeId);
            // Immediately set the edit node to ensure it loads
            setEditNode({ ...node });
            console.log('Set editNode to:', { ...node });
          }}
        >
          <span className="font-mono text-xs bg-white/50 px-2 py-1 rounded">{node.id}</span>
          <span className="text-xs px-2 py-1 rounded border border-gray-200 bg-white/50">{node.type}</span>
          <span className="truncate text-sm flex-1">{node.message.slice(0, 50)}{node.message.length > 50 ? '...' : ''}</span>
        </div>
        {node.options && node.options.map(opt => renderTree(opt.next, depth + 1, new Set(visited)))}
      </div>
    );
  };

  // Helper: render the appropriate tree based on active tab
  const renderFlowTree = () => {
    // If there's a search term, filter nodes that match
    if (searchTerm.trim()) {
      const filteredNodes = getFlowNodes(activeTab).filter(node => 
        node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return (
        <div>
          {filteredNodes.map(node => renderTree(node.id))}
        </div>
      );
    }
    
    // Otherwise show the full tree for the active tab
    if (activeTab === 'undergraduate') {
      return renderTree('undergrad_main');
    } else {
      return renderTree('grad_under_dev');
    }
  };

  // Save node edits
  const handleSave = () => {
    if (!editNode) {
      console.log('No editNode to save');
      return;
    }
    
    console.log('Saving node:', editNode);
    console.log('Current flow before save:', flow);
    
    // Create a new flow object with the updated node
    const updatedFlow = {
      ...flow,
      [editNode.id]: {
        id: editNode.id,
        type: editNode.type,
        message: editNode.message,
        options: editNode.options || []
      }
    };
    
    console.log('Updated flow after save:', updatedFlow);
    
    // Update the flow state
    setFlow(updatedFlow);
    
    // Save to localStorage for persistence
    if (mounted) {
      localStorage.setItem('chatbot-flow', JSON.stringify(updatedFlow));
      console.log('Flow saved to localStorage');
    }
    
    // Force a re-render by updating the selected node
    setSelectedNodeId(editNode.id);
    
    // Show success message
    setHasUnsavedChanges(false);
    alert(`Node "${editNode.id}" saved successfully!`);
  };

  // Add new node
  const handleAddNode = () => {
    if (!newNode.id || !newNode.type || !newNode.message) return;
    const updatedFlow = {
      ...flow,
      [newNode.id]: {
        id: newNode.id,
        type: newNode.type as NodeType,
        message: newNode.message,
        options: [],
      },
    };
    setFlow(updatedFlow);
    
    // Save to localStorage
    if (mounted) {
      localStorage.setItem('chatbot-flow', JSON.stringify(updatedFlow));
    }
    
    setNewNode({ type: 'category' });
    setShowAdd(false);
  };

  // Delete node
  const handleDeleteNode = (nodeId: string) => {
    if (!window.confirm('Delete this node?')) return;
    const newFlow = { ...flow };
    delete newFlow[nodeId];
    // Remove options pointing to this node
    Object.keys(newFlow).forEach(nid => {
      newFlow[nid].options = newFlow[nid].options?.filter(opt => opt.next !== nodeId);
    });
    setFlow(newFlow);
    
    // Save to localStorage
    if (mounted) {
      localStorage.setItem('chatbot-flow', JSON.stringify(newFlow));
    }
    
    setSelectedNodeId('entry');
    setEditNode({ ...newFlow['entry'] });
  };

  // Add option to node
  const handleAddOption = (label: string, next: string) => {
    if (!editNode) return;
    const updated = {
      ...editNode,
      options: [...(editNode.options || []), { label, next }],
    };
    setEditNode(updated);
    const updatedFlow = { ...flow, [editNode.id]: updated };
    setFlow(updatedFlow);
    
    // Save to localStorage
    if (mounted) {
      localStorage.setItem('chatbot-flow', JSON.stringify(updatedFlow));
    }
  };

  // Remove option from node
  const handleRemoveOption = (idx: number) => {
    if (!editNode) return;
    const updated = {
      ...editNode,
      options: (editNode.options || []).filter((_, i) => i !== idx),
    };
    setEditNode(updated);
    const updatedFlow = { ...flow, [editNode.id]: updated };
    setFlow(updatedFlow);
    
    // Save to localStorage
    if (mounted) {
      localStorage.setItem('chatbot-flow', JSON.stringify(updatedFlow));
    }
  };

  // Reset flow to original
  const handleResetFlow = () => {
    if (!window.confirm('Reset flow to original? This will lose all changes.')) return;
    setFlow({ ...initialFlow });
    if (mounted) {
      localStorage.removeItem('chatbot-flow');
    }
    setSelectedNodeId('entry');
    setEditNode({ ...initialFlow['entry'] });
    alert('Flow reset to original!');
  };

  // Export flow data
  const handleExportFlow = () => {
    const flowData = JSON.stringify(flow, null, 2);
    const blob = new Blob([flowData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chatbot-flow.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import flow data
  const handleImportFlow = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedFlow = JSON.parse(e.target?.result as string);
            setFlow(importedFlow);
            if (mounted) {
              localStorage.setItem('chatbot-flow', JSON.stringify(importedFlow));
            }
            alert('Flow imported successfully!');
          } catch {
            alert('Failed to import flow: Invalid JSON');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Flow Management System</h1>
              <p className="text-gray-600">Manage undergraduate and graduate advising flows separately</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportFlow}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                title="Export current flow data"
              >
                Export Flow
              </button>
              <button
                onClick={handleImportFlow}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                title="Import flow data from file"
              >
                Import Flow
              </button>
              <button
                onClick={handleResetFlow}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                title="Reset to original flow"
              >
                Reset Flow
              </button>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="text-sm text-gray-600">
            {mounted && localStorage.getItem('chatbot-flow') 
              ? '🟢 Using saved flow data (changes persist across reloads)' 
              : '🟡 Using original flow data (changes will be lost on reload)'}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('undergraduate')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'undergraduate'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Undergraduate Flow
              </button>
              <button
                onClick={() => setActiveTab('graduate')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'graduate'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Graduate Flow
              </button>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flow Tree Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeTab === 'undergraduate' ? 'Undergraduate' : 'Graduate'} Flow Tree
                </h2>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  onClick={() => setShowAdd(true)}
                >
                  + Add Node
                </button>
              </div>

              {/* Search */}
              <div className="mb-4">
                                 <input
                   type="text"
                   placeholder="Search nodes..."
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>

              {/* Tree View */}
              <div className="overflow-y-auto max-h-[60vh] border rounded-lg p-4 bg-gray-50">
                {renderFlowTree()}
              </div>

              {/* Add Node Form */}
              {showAdd && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">Add New Node</h3>
                  <div className="space-y-3">
                                         <input
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                       placeholder="Node ID"
                       value={newNode.id || ''}
                       onChange={e => setNewNode({ ...newNode, id: e.target.value })}
                     />
                                         <select
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                       value={newNode.type}
                       onChange={e => setNewNode({ ...newNode, type: e.target.value as NodeType })}
                     >
                      {nodeTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                                         <textarea
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                       placeholder="Node Message"
                       rows={3}
                       value={newNode.message || ''}
                       onChange={e => setNewNode({ ...newNode, message: e.target.value })}
                     />
                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        onClick={handleAddNode}
                      >
                        Add Node
                      </button>
                      <button
                        className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        onClick={() => setShowAdd(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Node Editor Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
                             {editNode ? (
                 <div key={editNode.id}>
                   <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-semibold text-gray-900">
                       Edit Node: {editNode.id}
                       <span className="text-sm text-gray-500 ml-2">({editNode.type})</span>
                     </h2>
                     <button
                       className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                       onClick={() => handleDeleteNode(editNode.id)}
                       disabled={editNode.id === 'entry'}
                     >
                       Delete Node
                     </button>
                   </div>

                                     {/* Debug Info */}
                   <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
                     <p><strong>Selected Node ID:</strong> {selectedNodeId}</p>
                     <p><strong>Edit Node ID:</strong> {editNode?.id}</p>
                     <p><strong>Edit Node Type:</strong> {editNode?.type}</p>
                     <p><strong>Edit Node Message:</strong> {editNode?.message?.substring(0, 50)}...</p>
                   </div>

                                      {/* Node Details */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Node ID</label>
                       <input
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                         value={editNode?.id || ''}
                         disabled
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Node Type</label>
                                                <select
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                           value={editNode?.type || 'category'}
                         onChange={e => {
                           const newType = e.target.value as NodeType;
                           console.log('Changing type to:', newType);
                           setEditNode(prev => {
                             if (!prev) return null;
                             const updated = { ...prev, type: newType };
                             console.log('Updated editNode:', updated);
                             setHasUnsavedChanges(true);
                             return updated;
                           });
                         }}
                       >
                         {nodeTypes.map(type => (
                           <option key={type} value={type}>{type}</option>
                         ))}
                       </select>
                     </div>
                   </div>

                   {/* Message */}
                   <div className="mb-6">
                     <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                     <textarea
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                       rows={4}
                       value={editNode?.message || ''}
                       onChange={e => {
                         const newMessage = e.target.value;
                         console.log('Changing message to:', newMessage);
                         setEditNode(prev => {
                           if (!prev) return null;
                           const updated = { ...prev, message: newMessage };
                           console.log('Updated editNode:', updated);
                           setHasUnsavedChanges(true);
                           return updated;
                         });
                       }}
                       placeholder="Enter the message that will be displayed to users..."
                     />
                   </div>

                                     <div className="flex gap-3 mb-6">
                     <button
                       className={`px-6 py-2 rounded-lg transition-colors ${
                         hasUnsavedChanges 
                           ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                           : 'bg-red-600 hover:bg-red-700 text-white'
                       }`}
                       onClick={handleSave}
                     >
                       {hasUnsavedChanges ? 'Save Changes*' : 'Save Changes'}
                     </button>
                     <button
                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                       onClick={() => {
                         console.log('Current editNode state:', editNode);
                         console.log('Current flow state:', flow);
                         alert(`Debug Info:\nEditNode: ${JSON.stringify(editNode, null, 2)}\n\nFlow: ${Object.keys(flow).length} nodes`);
                       }}
                     >
                       Debug
                     </button>
                   </div>

                  {/* Options */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
                    
                                         {/* Existing Options */}
                     <div className="space-y-3 mb-4">
                       {(editNode?.options || []).map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                                                     <input
                             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                             value={opt.label}
                            onChange={e => {
                              if (!editNode) return;
                              const updated = { ...editNode };
                              if (!updated.options) return;
                              updated.options[idx].label = e.target.value;
                              setEditNode(updated);
                              setFlow({ ...flow, [editNode.id]: updated });
                            }}
                            placeholder="Option label"
                          />
                                                     <select
                             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                             value={opt.next}
                            onChange={e => {
                              if (!editNode) return;
                              const updated = { ...editNode };
                              if (!updated.options) return;
                              updated.options[idx].next = e.target.value;
                              setEditNode(updated);
                              setFlow({ ...flow, [editNode.id]: updated });
                            }}
                          >
                            {nodeList.map(n => (
                              <option key={n.id} value={n.id}>{n.id}</option>
                            ))}
                          </select>
                          <button
                            className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            onClick={() => handleRemoveOption(idx)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add New Option */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Add New Option</h4>
                      <div className="flex gap-3">
                                                 <input
                           className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                           placeholder="Option Label"
                           value={newNode.label || ''}
                          onChange={e => setNewNode({ ...newNode, label: e.target.value })}
                        />
                                                 <select
                           className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                           value={newNode.next || ''}
                          onChange={e => setNewNode({ ...newNode, next: e.target.value })}
                        >
                          <option value="">Select target node</option>
                          {nodeList.map(n => (
                            <option key={n.id} value={n.id}>{n.id}</option>
                          ))}
                        </select>
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                          onClick={() => {
                            if (!newNode.label || !newNode.next) return;
                            handleAddOption(newNode.label, newNode.next);
                            setNewNode({ type: 'category' });
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Node Selected</h3>
                  <p className="text-gray-500">Select a node from the flow tree to edit its properties</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 