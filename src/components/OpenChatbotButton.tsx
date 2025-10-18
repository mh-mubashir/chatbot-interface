"use client";

import Image from "next/image";
import { useChatbotStore } from "../store/chatbotStore";

export default function OpenChatbotButton() {
  const setIsOpen = useChatbotStore((state) => state.setIsOpen);

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
    >
      <Image src="/coe_logo.png" alt="COE Bot" width={32} height={32} className="w-8 h-8" />
      <span className="font-semibold text-lg">Find the COE Bot to Start Chatting</span>
    </button>
  );
}

