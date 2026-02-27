import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const WELCOME = "Welcome to Velvet 24! ✨ I can help you explore our menu, find dishes, check prices, or answer questions about our banquet. What would you like to know?";

// Custom event for opening chat
export const openChatEvent = new Event("openVelvetChat");

async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok || !resp.body) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to connect");
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { done: readerDone, value } = await reader.read();
    if (readerDone) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }
  onDone();
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Listen for external open event
  useEffect(() => {
    const handler = () => {
      setIsOpen(true);
      setMessages(prev => {
        if (prev.length === 1) {
          return [
            ...prev,
            { role: "assistant", content: "🏛️ Welcome! I can help you with banquet enquiries — packages, pricing, capacity, and more. What would you like to know?" }
          ];
        }
        return prev;
      });
    };
    window.addEventListener("openVelvetChat", handler);
    return () => window.removeEventListener("openVelvetChat", handler);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setInput("");
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const allMessages = [...messages.filter(m => m.content !== WELCOME), userMsg];

    try {
      await streamChat({
        messages: allMessages,
        onDelta: (chunk) => {
          assistantSoFar += chunk;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && last !== messages[0]) {
              return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
            }
            return [...prev, { role: "assistant", content: assistantSoFar }];
          });
        },
        onDone: () => setIsLoading(false),
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again!" }]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient shadow-gold transition-transform hover:scale-110"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-luxury"
          >
            <div className="flex items-center justify-between bg-gold-gradient px-4 py-3">
              <div>
                <p className="font-display text-sm font-bold text-primary-foreground">
                  Velvet 24 Concierge
                </p>
                <p className="font-body text-[10px] text-primary-foreground/70">
                  AI-powered • Ask anything
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X className="h-5 w-5 text-primary-foreground/80 hover:text-primary-foreground" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-lg px-3 py-2 font-body text-xs leading-relaxed ${
                    msg.role === "user" ? "bg-gold/20 text-foreground" : "bg-secondary text-secondary-foreground"
                  }`}>
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => <strong className="font-semibold text-gold">{children}</strong>,
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline underline-offset-2 hover:text-gold-light">
                            {children}
                          </a>
                        ),
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-4 space-y-0.5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 space-y-0.5">{children}</ol>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="rounded-lg bg-secondary px-3 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gold" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border p-3">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our menu..."
                  disabled={isLoading}
                  className="flex-1 rounded-lg bg-secondary px-3 py-2 font-body text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-gold/50 disabled:opacity-50"
                />
                <button type="submit" disabled={isLoading} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-gradient text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50" aria-label="Send message">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
