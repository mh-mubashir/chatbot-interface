"use client";
import React, { useEffect, useState } from "react";
import ChatbotWidget from "./ChatbotWidget";

export default function ChatbotWidgetClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <ChatbotWidget />;
} 