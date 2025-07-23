import { create } from 'zustand';
import { chatbotFlow, FlowNode } from '../utils/flows';

interface ChatOption {
  id: string;
  label: string;
  next: string;
}

interface ChatNode {
  id: string;
  message: string;
  options: ChatOption[];
}

interface ChatHistoryItem {
  nodeId: string;
  selectedOptionLabel?: string;
}

interface ChatbotState {
  currentNode: FlowNode;
  history: ChatHistoryItem[];
  goToNode: (nodeId: string, selectedOptionLabel?: string) => void;
  reset: () => void;
}

export const useChatbotStore = create<ChatbotState>((set, get) => ({
  currentNode: chatbotFlow.entry,
  history: [],
  goToNode: (nodeId, selectedOptionLabel) => {
    const node = chatbotFlow[nodeId];
    if (!node) return;
    set((state) => ({
      currentNode: node,
      history: [
        ...state.history,
        { nodeId: state.currentNode.id, selectedOptionLabel },
      ],
    }));
  },
  reset: () => set({ currentNode: chatbotFlow.entry, history: [] }),
})); 