"use client";
import React, { useState, useEffect } from 'react';
import { chatbotFlow as initialFlow, FlowNode, NodeType } from '../../utils/flows';

const typeColors: Record<NodeType, string> = {
  entry: 'bg-blue-100 text-blue-900 font-bold border border-blue-300',
  category: 'bg-blue-200 text-blue-900 font-bold border border-blue-400',
  sub_option: 'bg-yellow-100 text-yellow-900 font-bold border border-yellow-300',
  response: 'bg-green-100 text-green-900 font-bold border border-green-300',
  satisfaction: 'bg-purple-200 text-purple-900 font-bold border border-purple-300',
  end: 'bg-gray-700 text-white font-bold border border-gray-500',
};

const nodeTypes: NodeType[] = [
  'entry', 'category', 'sub_option', 'response', 'satisfaction', 'end'
];

export default function AdminPanel() {
  const [mounted, setMounted] = useState(false);
  const [flow, setFlow] = useState<Record<string, FlowNode>>(() => ({ ...initialFlow }));
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('entry');
  const [editNode, setEditNode] = useState<FlowNode | null>(initialFlow['entry']);
  const [newNode, setNewNode] = useState<Partial<FlowNode>>({ type: 'category' });
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Helper: get all nodes as array
  const nodeList = Object.values(flow);

  // Helper: get children of a node
  const getChildren = (nodeId: string) =>
    nodeList.filter(n => n.options?.some(opt => opt.next === nodeId));

  // Helper: render tree recursively
  const renderTree = (nodeId: string, depth = 0, visited = new Set<string>()) => {
    if (visited.has(nodeId)) return null; // Prevent infinite recursion
    visited.add(nodeId);
    const node = flow[nodeId];
    if (!node) return null;
    return (
      <div key={nodeId} style={{ marginLeft: depth * 16 }}>
        <div
          className={`p-2 mb-1 rounded cursor-pointer flex items-center gap-2 ${typeColors[node.type]} ${selectedNodeId === nodeId ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => {
            setSelectedNodeId(nodeId);
            setEditNode({ ...node });
          }}
        >
          <span className="font-mono text-xs">{node.id}</span>
          <span className="text-xs px-2 py-0.5 rounded border border-gray-200" style={{ background: 'rgba(0,0,0,0.03)' }}>{node.type}</span>
          <span className="truncate text-sm">{node.message.slice(0, 40)}{node.message.length > 40 ? '...' : ''}</span>
        </div>
        {node.options && node.options.map(opt => renderTree(opt.next, depth + 1, new Set(visited)))}
      </div>
    );
  };

  // Save node edits
  const handleSave = () => {
    if (!editNode) return;
    setFlow({ ...flow, [editNode.id]: { ...editNode } });
  };

  // Add new node
  const handleAddNode = () => {
    if (!newNode.id || !newNode.type || !newNode.message) return;
    setFlow({
      ...flow,
      [newNode.id]: {
        id: newNode.id,
        type: newNode.type as NodeType,
        message: newNode.message,
        options: [],
      },
    });
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
    setFlow({ ...flow, [editNode.id]: updated });
  };

  // Remove option from node
  const handleRemoveOption = (idx: number) => {
    if (!editNode) return;
    const updated = {
      ...editNode,
      options: (editNode.options || []).filter((_, i) => i !== idx),
    };
    setEditNode(updated);
    setFlow({ ...flow, [editNode.id]: updated });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Flow Management</h1>
      <div className="flex gap-8">
        {/* Flow Tree */}
        <div className="w-1/3 overflow-y-auto max-h-[80vh] border-r pr-4">
          <h2 className="font-semibold mb-2">Flow Tree</h2>
          {renderTree('entry')}
          <button
            className="mt-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full"
            onClick={() => setShowAdd(true)}
          >
            + Add Node
          </button>
          {showAdd && (
            <div className="mt-2 p-2 border rounded bg-gray-50">
              <input
                className="border rounded px-2 py-1 w-full mb-1"
                placeholder="Node ID"
                value={newNode.id || ''}
                onChange={e => setNewNode({ ...newNode, id: e.target.value })}
              />
              <select
                className="border rounded px-2 py-1 w-full mb-1"
                value={newNode.type}
                onChange={e => setNewNode({ ...newNode, type: e.target.value as NodeType })}
              >
                {nodeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <textarea
                className="border rounded px-2 py-1 w-full mb-1"
                placeholder="Node Message"
                value={newNode.message || ''}
                onChange={e => setNewNode({ ...newNode, message: e.target.value })}
              />
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full mb-1"
                onClick={handleAddNode}
              >
                Add Node
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded w-full"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        {/* Node Editor */}
        <div className="flex-1">
          {editNode && (
            <div>
              <h2 className="font-semibold mb-2">Edit Node</h2>
              <div className="flex gap-2 mb-2">
                <input
                  className="border rounded px-2 py-1 flex-1"
                  value={editNode.id}
                  disabled
                />
                <select
                  className="border rounded px-2 py-1"
                  value={editNode.type}
                  onChange={e => setEditNode({ ...editNode, type: e.target.value as NodeType })}
                >
                  {nodeTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <button
                  className="text-red-500 hover:text-red-700 px-2"
                  onClick={() => handleDeleteNode(editNode.id)}
                  disabled={editNode.id === 'entry'}
                >
                  Delete
                </button>
              </div>
              <textarea
                className="w-full border rounded p-2 mb-2"
                rows={3}
                value={editNode.message}
                onChange={e => setEditNode({ ...editNode, message: e.target.value })}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                onClick={handleSave}
              >
                Save
              </button>
              {/* Options List */}
              <h3 className="font-semibold mb-1 mt-4">Options</h3>
              <ul className="mb-2">
                {(editNode.options || []).map((opt, idx) => (
                  <li key={idx} className="flex items-center gap-2 mb-1">
                    <input
                      className="border rounded px-1 py-0.5 text-sm"
                      value={opt.label}
                      onChange={e => {
                        const updated = { ...editNode };
                        if (!updated.options) return;
                        updated.options[idx].label = e.target.value;
                        setEditNode(updated);
                        setFlow({ ...flow, [editNode.id]: updated });
                      }}
                    />
                    <select
                      className="border rounded px-1 py-0.5 text-sm"
                      value={opt.next}
                      onChange={e => {
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
                      className="text-red-500 hover:underline text-xs"
                      onClick={() => handleRemoveOption(idx)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              {/* Add Option */}
              <div className="flex gap-2 mb-2">
                <input
                  className="border rounded px-2 py-1 text-sm flex-1"
                  placeholder="Option Label"
                  value={newNode.label || ''}
                  onChange={e => setNewNode({ ...newNode, label: e.target.value })}
                />
                <select
                  className="border rounded px-2 py-1 text-sm flex-1"
                  value={newNode.next || ''}
                  onChange={e => setNewNode({ ...newNode, next: e.target.value })}
                >
                  <option value="">Select target node</option>
                  {nodeList.map(n => (
                    <option key={n.id} value={n.id}>{n.id}</option>
                  ))}
                </select>
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
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
          )}
        </div>
      </div>
    </div>
  );
} 