"use client";
import React, { useState } from 'react';
import { useChatbotStore } from '../../store/chatbotStore';
import { User, Home, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

// Unified color scheme - no multiple colors for different node types
const messageBubbleStyle = 'bg-white text-black border border-gray-200';
const userBubbleStyle = 'bg-black text-white';
const optionButtonStyle = 'bg-white text-black border-2 border-black hover:bg-black hover:text-white';

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { currentNode, history, goToNode, goBack, reset, loadFlowData, dataSource, isLoading } = useChatbotStore();
  const [typing, setTyping] = useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Load flow data from API on mount
  React.useEffect(() => {
    loadFlowData();
  }, [loadFlowData]);

  // Simulate typing indicator for bot responses
  React.useEffect(() => {
    if (open && history.length > 0) {
      setTyping(true);
      const timer = setTimeout(() => setTyping(false), 500);
      return () => clearTimeout(timer);
    }
    setTyping(false);
  }, [currentNode.id, open, history.length]);

  // Auto-scroll to bottom when history or currentNode changes
  React.useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, currentNode, open]);

  // Helper to extract and format links from text and handle line breaks
  const formatMessageWithLinks = (message: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-all"
          >
            {part}
          </a>
        );
      }
      // Handle line breaks by splitting on \n and adding <br /> elements
      return part.split('\n').map((line, i, arr) => (
        <React.Fragment key={`${index}-${i}`}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  // Helper to get the full conversation history as bubbles
  const renderHistory = () => {
    const { flowData } = useChatbotStore.getState();
    const bubbles = [];
    for (let i = 0; i < history.length; i++) {
      const item = history[i];
      const node = flowData[item.nodeId];
      if (!node) continue;
      // Bot message bubble
      bubbles.push(
        <div key={`bot-${i}`} className="flex items-start gap-2 mb-3">
          <div className="flex-shrink-0">
            <Image src="/coe_logo.png" alt="COE Bot" width={20} height={20} className="w-5 h-5" />
          </div>
          <div className={`rounded-2xl px-4 py-2 max-w-[75%] shadow ${messageBubbleStyle} break-words`}>
            {formatMessageWithLinks(node.message)}
          </div>
        </div>
      );
      // User selection bubble (if any)
      if (item.selectedOptionLabel) {
        bubbles.push(
          <div key={`user-${i}`} className="flex items-start gap-2 mb-3 justify-end">
            <div className={`rounded-2xl px-4 py-2 max-w-[75%] shadow ${userBubbleStyle} flex items-center gap-1`}>
              <User className="w-4 h-4 text-white opacity-70" />
              <span>{item.selectedOptionLabel}</span>
            </div>
          </div>
        );
      }
    }
    return bubbles;
  };

  // Function to go back to initial selection
  const goToInitialSelection = () => {
    goToNode('entry', 'Home');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!open && (
        <button
          className="relative bg-white rounded-full shadow-2xl p-4 hover:shadow-3xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-red-400 overflow-hidden group animate-pulse"
          onClick={() => setOpen(true)}
          aria-label="Open COE Bot"
          style={{
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.3), 0 0 40px rgba(220, 38, 38, 0.2), 0 0 60px rgba(220, 38, 38, 0.1)',
          }}
        >
          {/* Shine effect overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-20"></div>
          <div className="absolute inset-2 rounded-full border border-red-400 animate-pulse opacity-30"></div>
          <Image src="/coe_logo.png" alt="COE Bot" width={48} height={48} className="w-12 h-12 relative z-10" />
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div className="w-96 max-w-[95vw] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in border border-gray-200">
          {/* Header - Black background like in the image */}
          <div className="flex items-center justify-between px-6 py-4 bg-black">
            <div className="flex items-center">
              <Image src="/neu_white_logo.png" alt="Northeastern University" width={250} height={50} className="h-10 w-auto" />
            </div>
            <div className="flex items-center gap-2">
              {/* Home Button - only show if not at entry */}
              {currentNode.id !== 'entry' && (
                <button
                  className="flex items-center gap-2 text-white hover:text-red-200 focus:outline-none px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 border border-white/30 hover:border-white/50"
                  onClick={goToInitialSelection}
                  aria-label="Return to main menu"
                  title="Return to main menu"
                >
                  <Home className="w-6 h-6" />
                  <span className="font-semibold text-base">Home</span>
                </button>
              )}
              <button
                className="text-white hover:text-red-200 focus:outline-none text-2xl font-bold"
                onClick={() => setOpen(false)}
                aria-label="Close Chatbot"
              >
                ✕
              </button>
            </div>
          </div>
          {/* Chat History - White background like in the image */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1 bg-white max-h-96">
            {renderHistory()}
            {/* Current bot message bubble */}
            <div className="flex items-start gap-2 mb-3">
              <div className="flex-shrink-0">
                <Image src="/coe_logo.png" alt="COE Bot" width={20} height={20} className="w-5 h-5" />
              </div>
              <div className={`rounded-2xl px-4 py-2 max-w-[75%] shadow ${messageBubbleStyle} break-words`}>
                {formatMessageWithLinks(currentNode.message)}
              </div>
            </div>
            {/* Typing indicator */}
            {typing && (
              <div className="flex items-start gap-2 mb-3">
                <div className="flex-shrink-0">
                  <Image src="/coe_logo.png" alt="COE Bot" width={20} height={20} className="w-5 h-5" />
                </div>
                <div className="rounded-2xl px-4 py-2 max-w-[75%] bg-white text-black border border-gray-200 animate-pulse flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-black rounded-full animate-bounce mr-1" style={{ animationDelay: '0s' }}></span>
                  <span className="inline-block w-2 h-2 bg-black rounded-full animate-bounce mr-1" style={{ animationDelay: '0.1s' }}></span>
                  <span className="inline-block w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Sticky Options Bar - Light gray background like in the image */}
          <div className="px-4 py-3 border-t bg-gray-100 flex flex-col gap-2 sticky bottom-0">
            {/* Back Button - Show when there's history */}
            {history.length > 0 && (
              <button
                className="rounded-full px-4 py-2 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300 flex items-center justify-center gap-2"
                onClick={goBack}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            {currentNode.options && currentNode.options.length > 0 && (
              <div className="flex flex-col gap-2">
                {currentNode.options.map((opt) => (
                  <button
                    key={opt.label}
                    className={`rounded-full px-4 py-2 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-red-400 transition-all ${optionButtonStyle}`}
                    onClick={() => goToNode(opt.next, opt.label)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            {/* If at end, show reset */}
            {(!currentNode.options || currentNode.options.length === 0) && (
              <div className="flex flex-col items-center gap-2">
                <button
                  className="rounded-full px-4 py-2 bg-gray-300 text-gray-800 font-semibold shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={reset}
                >
                  Restart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget; 