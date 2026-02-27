import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { menuCategories, lunchMenus, contactInfo, banquetPackages } from "@/data/menuData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME = "Welcome to Velvet 24! ✨ I can help you explore our menu, find dishes, check prices, or answer questions about our banquet. What would you like to know?";

function searchMenu(query: string): string {
  const q = query.toLowerCase();

  // Check for greetings
  if (/^(hi|hello|hey|namaste|good\s?(morning|evening|afternoon))/.test(q)) {
    return WELCOME;
  }

  // Check for hours/timing
  if (/hour|time|open|close|timing|when/i.test(q)) {
    return `🕐 **Our Timings:**\n- **Lunch:** ${contactInfo.hours.lunch}\n- **Dinner:** ${contactInfo.hours.dinner}`;
  }

  // Check for banquet queries
  if (/banquet|event|wedding|party|celebration|sangeet|reception|corporate|conference|capacity|package/i.test(q)) {
    if (/package|price|cost|rate/i.test(q)) {
      const pkgs = banquetPackages.map(p => `- **${p.name}** — ${p.price}/person`).join("\n");
      return `🏛️ **Banquet Packages** (per person, GST extra):\n${pkgs}\n\nAlso available: Breakfast packages from ₹110/person.\n\nFor bookings: **${contactInfo.phone}**`;
    }
    return "🏛️ **Velvet 24 Banquet**\n- Capacity: **100 to 400 guests**\n- Events: Weddings, Receptions, Sangeet, Ring Ceremony, Birthday Parties, Corporate Events, Conferences & Family Gatherings\n- Hall rental free for 200+ guests\n- Packages start from **₹440/person**\n\nFor bookings, contact us at **" + contactInfo.phone + "**";
  }

  // Check for lunch specials
  if (/lunch|thali|special.*lunch|fix|royal|executive/i.test(q)) {
    const lunches = lunchMenus.map(m => `- **${m.title}** — ${m.price}: ${m.items}`).join("\n");
    return `🍽️ **Lunch Specials** (11 AM – 3 PM):\n${lunches}`;
  }

  // Check for specific category
  for (const cat of menuCategories) {
    const catLower = cat.title.toLowerCase();
    if (q.includes(catLower) || catLower.includes(q.replace(/[?!.,]/g, "").trim())) {
      const items = cat.items.slice(0, 8).map(i => `- ${i.name} — ${i.price}`).join("\n");
      return `📋 **${cat.title}:**\n${items}${cat.items.length > 8 ? `\n\n...and ${cat.items.length - 8} more items. Check our full menu!` : ""}`;
    }
  }

  // Search for specific items
  const matches: { name: string; price: string; category: string }[] = [];
  for (const cat of menuCategories) {
    for (const item of cat.items) {
      if (item.name.toLowerCase().includes(q.replace(/[?!.,]/g, "").trim()) || 
          q.replace(/[?!.,]/g, "").trim().split(/\s+/).some(word => word.length > 2 && item.name.toLowerCase().includes(word))) {
        matches.push({ name: item.name, price: item.price, category: cat.title });
      }
    }
  }

  if (matches.length > 0) {
    const results = matches.slice(0, 6).map(m => `- **${m.name}** — ${m.price} *(${m.category})*`).join("\n");
    return `Found these for you:\n${results}`;
  }

  // Check for price/cheap/expensive queries
  if (/cheap|budget|affordable|under|low.*price/i.test(q)) {
    return "💰 **Budget-Friendly Options:**\n- Tandoori Roti — ₹50\n- Papaya Shake — ₹60\n- Sandwich — ₹80\n- Dal Fry — ₹190\n- Hara Bhara Kabab — ₹200\n\nWe have great value lunch specials starting at just **₹220!**";
  }

  if (/expensive|premium|best|signature|special|recommend/i.test(q)) {
    return "⭐ **Our Signature Picks:**\n- Velvet 24 Special Pizza — ₹350\n- Velvet 24 Paneer Special — ₹450\n- Veg Ala-Kiev Sizzler — ₹560\n- Thai Sizzler — ₹550\n- Lal Patidar Ki Mehfil — ₹499";
  }

  // Fallback
  return `I'm not sure about that! Here's how you can reach us:\n\n📞 **Phone:** ${contactInfo.phone}\n📧 **Email:** ${contactInfo.email}\n📍 **${contactInfo.address}**\n\nOr try asking me about our **menu categories**, **prices**, **lunch specials**, or **banquet bookings**!`;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);

    setTimeout(() => {
      const reply = searchMenu(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Button */}
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

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-luxury"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gold-gradient px-4 py-3">
              <div>
                <p className="font-display text-sm font-bold text-primary-foreground">
                  Velvet 24 Concierge
                </p>
                <p className="font-body text-[10px] text-primary-foreground/70">
                  Ask about menu, prices & bookings
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X className="h-5 w-5 text-primary-foreground/80 hover:text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 font-body text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gold/20 text-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.content.split("\n").map((line, j) => (
                      <p key={j} className={j > 0 ? "mt-1" : ""}>
                        {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={k} className="font-semibold text-gold">
                              {part.slice(2, -2)}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our menu..."
                  className="flex-1 rounded-lg bg-secondary px-3 py-2 font-body text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-gold/50"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-gradient text-primary-foreground transition-transform hover:scale-105"
                  aria-label="Send message"
                >
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
