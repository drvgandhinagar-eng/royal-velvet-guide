import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuCategories } from "@/data/menuData";
import { Sparkles } from "lucide-react";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const activeMenu = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu" className="relative py-28 px-4 section-glow">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-gold-light">
            Curated for You
          </p>
          <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-6xl">
            Our Menu
          </h2>
          <div className="divider-ornament mt-6">
            <span className="ornament-diamond" />
          </div>
        </motion.div>

        {/* Category Pills - scrollable on mobile */}
        <div className="mb-14 overflow-x-auto scrollbar-none">
          <div className="flex justify-center gap-2 min-w-max px-4">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative rounded-full px-5 py-2.5 font-body text-[11px] font-medium uppercase tracking-wider transition-all duration-400 ${
                  activeCategory === cat.id
                    ? "bg-gold-gradient text-primary-foreground shadow-gold-lg"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/30"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items in glass card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl glass-card rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Sparkles className="h-4 w-4 text-gold/60" />
              <h3 className="text-center font-display text-2xl text-gold md:text-3xl">
                {activeMenu.title}
              </h3>
              <Sparkles className="h-4 w-4 text-gold/60" />
            </div>

            <div className="space-y-0.5">
              {activeMenu.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, ease: "easeOut" }}
                  className="group relative flex items-baseline gap-3 rounded-xl px-5 py-4 transition-all duration-300 hover:bg-gold/[0.03]"
                >
                  {/* Hover accent bar */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[2px] rounded-full bg-gold transition-all duration-300 group-hover:h-8" />
                  
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-elegant text-lg font-medium text-foreground transition-colors group-hover:text-gold md:text-xl">
                        {item.name}
                      </span>
                      <span className="flex-1 border-b border-dotted border-gold/10 group-hover:border-gold/25 transition-colors" />
                      <span className="font-display text-sm font-bold text-gold">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-1.5 font-body text-xs text-muted-foreground/80 pl-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Jain & GST note */}
        <div className="mt-10 text-center">
          <div className="divider-ornament mb-4">
            <span className="ornament-diamond" />
          </div>
          <p className="font-elegant text-sm italic text-muted-foreground">
            Jain Food Also Available &bull; GST Extra Applicable
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
