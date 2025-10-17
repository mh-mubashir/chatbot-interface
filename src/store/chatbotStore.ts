import { create } from 'zustand';
import { chatbotFlow, FlowNode } from '../utils/flows';

interface ChatHistoryItem {
  nodeId: string;
  selectedOptionLabel?: string;
}

interface ChatbotState {
  currentNode: FlowNode;
  history: ChatHistoryItem[];
  flowData: Record<string, FlowNode>;
  dataSource: 'supabase' | 'hardcoded' | 'loading';
  isLoading: boolean;
  error: string | null;
  loadFlowData: () => Promise<void>;
  goToNode: (nodeId: string, selectedOptionLabel?: string) => void;
  goBack: () => void;
  reset: () => void;
}

export const useChatbotStore = create<ChatbotState>((set, get) => ({
  currentNode: chatbotFlow.entry,
  history: [],
  flowData: chatbotFlow,
  dataSource: 'hardcoded',
  isLoading: false,
  error: null,
  
  loadFlowData: async () => {
    set({ isLoading: true, error: null });
    
    try {
      console.log('🔄 Fetching chatbot flow data from API...');
      const response = await fetch('/api/chatbot/nodes');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        const source = result.source || 'supabase';
        
        if (source === 'supabase') {
          console.log('✅ Chatbot data loaded from SUPABASE');
        } else {
          console.log('⚠️ Chatbot data loaded from HARDCODED FLOWS (fallback)');
        }
        
        set({ 
          flowData: result.data,
          dataSource: source,
          currentNode: result.data.entry || chatbotFlow.entry,
          isLoading: false 
        });
      } else {
        throw new Error(result.error || 'Failed to load flow data');
      }
    } catch (error: any) {
      console.error('❌ Error loading flow data, using hardcoded flows:', error);
      console.log('⚠️ Chatbot data loaded from HARDCODED FLOWS (error fallback)');
      
      set({ 
        flowData: chatbotFlow,
        dataSource: 'hardcoded',
        currentNode: chatbotFlow.entry,
        isLoading: false,
        error: error.message 
      });
    }
  },
  
  goToNode: (nodeId, selectedOptionLabel) => {
    const state = get();
    const node = state.flowData[nodeId];
    
    if (!node) {
      console.warn(`⚠️ Node "${nodeId}" not found in flow data`);
      return;
    }
    
    set((state) => ({
      currentNode: node,
      history: [
        ...state.history,
        { nodeId: state.currentNode.id, selectedOptionLabel },
      ],
    }));
  },
  
  goBack: () => {
    const state = get();
    
    if (state.history.length === 0) return;
    
    const newHistory = [...state.history];
    const previousItem = newHistory.pop();
    
    if (!previousItem) return;
    
    const previousNode = state.flowData[previousItem.nodeId];
    if (!previousNode) {
      console.warn(`⚠️ Previous node "${previousItem.nodeId}" not found`);
      return;
    }
    
    set({
      currentNode: previousNode,
      history: newHistory,
    });
  },
  
  reset: () => {
    const state = get();
    set({ 
      currentNode: state.flowData.entry || chatbotFlow.entry, 
      history: [] 
    });
  },
})); 