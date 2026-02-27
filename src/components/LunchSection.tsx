import { motion } from "framer-motion";
import { lunchMenus } from "@/data/menuData";
import { Crown } from "lucide-react";

const tierIcons = ["🥉", "🥈", "🥇"];

const LunchSection = () => {
  return (
    <section className="relative py-28 px-4 pattern-bg section-glow">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-gold-light">
            Value for Excellence
          </p>
          <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-6xl">
            Lunch Specials
          </h2>
          <div className="divider-ornament mt-6">
            <span className="ornament-diamond" />
          </div>
          <p className="mt-6 font-elegant text-base italic text-muted-foreground">
            Available 11:00 AM – 3:00 PM
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {lunchMenus.map((menu, i) => (
            <motion.div
              key={menu.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl glass-card-hover p-8 ${
                i === 2 ? "md:scale-105 md:shadow-gold" : ""
              }`}
            >
              {/* Premium badge for executive */}
              {i === 2 && (
                <div className="absolute top-4 right-4">
                  <Crown className="h-5 w-5 text-gold animate-pulse" />
                </div>
              )}

              <div className="mb-6 text-center">
                <span className="text-2xl">{tierIcons[i]}</span>
                <h3 className="mt-2 font-display text-xl text-foreground group-hover:text-gold transition-colors">{menu.title}</h3>
                <div className="mt-3 inline-block rounded-full bg-gold/10 px-6 py-2">
                  <p className="font-display text-3xl font-bold text-gold">{menu.price}</p>
                </div>
              </div>
              <div className="divider-gold mx-auto w-16 mb-5" />
              <p className="font-body text-xs leading-[1.8] text-muted-foreground text-center">
                {menu.items}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LunchSection;
