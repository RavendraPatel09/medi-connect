import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, Input, Button } from "@medicycle/ui";
import { Send, User } from "lucide-react";
import { motion } from "framer-motion";

// Mock user for demo purposes
const MY_USER_ID = "buyer_123";
const TARGET_SELLER_ID = "seller_456";

interface Message {
  id: string;
  sender_id: string;
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender_id: TARGET_SELLER_ID, content: "Hello! The medicine is still available.", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In production, this would point to the actual backend URL
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${MY_USER_ID}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender_id: data.sender_id,
          content: data.content,
          timestamp: new Date(),
        },
      ]);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add to local state immediately for optimistic UI
    const newMessage = {
      id: Math.random().toString(),
      sender_id: MY_USER_ID,
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Send over WebSocket
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          target_id: TARGET_SELLER_ID,
          content: inputValue,
        })
      );
    }

    setInputValue("");
  };

  return (
    <div className="flex h-screen bg-background p-6 items-center justify-center">
      <Card glass className="w-full max-w-3xl h-[80vh] flex flex-col p-0 overflow-hidden">
        <CardHeader className="border-b border-white/5 bg-surface/80 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <User className="text-primary" size={20} />
            </div>
            <div>
              <CardTitle className="text-lg">John (Seller)</CardTitle>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>
        </CardHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isMe = msg.sender_id === MY_USER_ID;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    isMe
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-surface text-gray-100 border border-white/5 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-[10px] opacity-50 mt-1 block">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/5 bg-surface/50 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="primary">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
