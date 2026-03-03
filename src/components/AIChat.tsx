"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm Khizar's AI assistant. Ask me anything about his work, skills, or projects." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg }),
            });

            const data = await res.json();

            if (data.text) {
                setMessages(prev => [...prev, { role: "assistant", content: data.text }]);
            } else if (data.error) {
                setMessages(prev => [...prev, { role: "assistant", content: data.error }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting to the brain. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-background shadow-2xl flex items-center justify-center border border-accent/20 group hover:shadow-accent/40 transition-all"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-pulse" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-background/80 blur-backdrop border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border bg-accent/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                                    <Bot size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                        Khizar AI <Sparkles size={12} className="text-accent animate-pulse" />
                                    </h3>
                                    <p className="text-[10px] font-bold text-muted uppercase">Ready to assist</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                        >
                            {messages.map((ms, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: ms.role === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${ms.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${ms.role === "user"
                                        ? "bg-accent text-background font-medium rounded-tr-none"
                                        : "bg-muted/50 border border-border rounded-tl-none leading-relaxed"
                                        }`}>
                                        {ms.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-muted/50 border border-border p-3 rounded-2xl rounded-tl-none">
                                        <Loader2 size={18} className="animate-spin text-accent" />
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-background/50">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask about projects, skills..."
                                    className="w-full bg-muted/30 border border-border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            {/* <p className="text-[8px] text-center mt-3 text-muted uppercase font-black tracking-widest">
                                Powered by Gemini
                            </p> */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
