import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuCategories } from "@/data/menuData";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const activeMenu = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-gold-light">
            Curated for You
          </p>
          <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-5xl">
            Our Menu
          </h2>
          <div className="mx-auto mt-4 divider-gold w-32" />
        </motion.div>

        {/* Category Pills */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 font-body text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gold-gradient text-primary-foreground shadow-gold"
                  : "border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-3xl"
          >
            <h3 className="mb-8 text-center font-display text-2xl text-foreground">
              {activeMenu.title}
            </h3>

            <div className="space-y-1">
              {activeMenu.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group flex items-baseline gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-elegant text-lg font-medium text-foreground group-hover:text-gold transition-colors">
                        {item.name}
                      </span>
                      <span className="flex-1 border-b border-dotted border-border/50" />
                      <span className="font-body text-sm font-semibold text-gold">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-1 font-body text-xs text-muted-foreground">
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
        <div className="mt-12 text-center">
          <p className="font-body text-xs text-muted-foreground">
            Jain Food Also Available • GST Extra Applicable
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
