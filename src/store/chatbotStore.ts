import { create } from 'zustand';
import { chatbotFlow, FlowNode } from '../utils/flows';

// interface ChatOption {
//   id: string;
//   label: string;
//   next: string;
// }

interface ChatHistoryItem {
  nodeId: string;
  selectedOptionLabel?: string;
}

interface ChatbotState {
  currentNode: FlowNode;
  history: ChatHistoryItem[];
  goToNode: (nodeId: string, selectedOptionLabel?: string) => void;
  goBack: () => void;
  reset: () => void;
}

export const useChatbotStore = create<ChatbotState>((set/*, get*/) => ({
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
  goBack: () => {
    set((state) => {
      if (state.history.length === 0) return state;
      
      const newHistory = [...state.history];
      const previousItem = newHistory.pop();
      
      if (!previousItem) return state;
      
      const previousNode = chatbotFlow[previousItem.nodeId];
      if (!previousNode) return state;
      
      return {
        currentNode: previousNode,
        history: newHistory,
      };
    });
  },
  reset: () => set({ currentNode: chatbotFlow.entry, history: [] }),
})); 