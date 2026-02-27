import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, PartyPopper, Building2 } from "lucide-react";
import { banquetPackages, hallRental, conferenceAids } from "@/data/menuData";
import restaurant2 from "@/assets/restaurant-2.jpeg";

const events = [
  { icon: PartyPopper, label: "Sangeet / Ring Ceremony / Wedding / Reception" },
  { icon: Users, label: "Birthday / Kitty Party / Baby Shower" },
  { icon: Building2, label: "Corporate Events / Conferences / Family Gathering" },
];

const BanquetSection = () => {
  const [activePkg, setActivePkg] = useState(0);

  return (
    <section id="banquet" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Top: Image + Info */}
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-20">
          <motion.div
            className="relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={restaurant2}
              alt="Velvet 24 banquet hall decorated for celebration"
              className="w-full h-80 lg:h-[500px] object-cover rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-lg" />
            <div className="absolute bottom-6 left-6">
              <p className="font-display text-2xl font-bold text-gold">100 – 400 Guests</p>
              <p className="font-body text-sm text-foreground/80">Biggest Celebration Destination</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-gold-light">
              Grand Celebrations
            </p>
            <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-5xl">
              The Banquet
            </h2>
            <div className="mt-4 divider-gold w-24" />

            <p className="mt-6 font-elegant text-lg leading-relaxed text-foreground/70">
              Transform your special moments into unforgettable memories at Velvet 24's
              magnificent banquet hall — the biggest celebration destination in Gandhinagar.
            </p>

            <div className="mt-8 space-y-4">
              {events.map((event, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 rounded-lg border border-border/50 p-4 transition-all hover:border-gold/30 hover:bg-secondary/30"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <event.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="font-body text-sm text-foreground/80">{event.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Banquet Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-8 text-center font-display text-3xl text-gold-gradient">
            Banquet Packages
          </h3>
          <p className="mb-6 text-center font-body text-xs text-muted-foreground">Per person • GST Extra</p>

          {/* Package tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {banquetPackages.map((pkg, i) => (
              <button
                key={i}
                onClick={() => setActivePkg(i)}
                className={`rounded-full px-5 py-2 font-body text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  activePkg === i
                    ? "bg-gold-gradient text-primary-foreground shadow-gold"
                    : "border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                }`}
              >
                {pkg.name} {pkg.price !== "On Request" && `— ${pkg.price}`}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePkg}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-lg rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 text-center">
                <h4 className="font-display text-xl text-foreground">{banquetPackages[activePkg].name}</h4>
                <p className="font-display text-3xl font-bold text-gold">{banquetPackages[activePkg].price}</p>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>
              <div className="divider-gold mx-auto w-16 mb-4" />
              <div className="space-y-2">
                {banquetPackages[activePkg].items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between py-1">
                    <span className="font-body text-sm text-foreground/80">{item.name}</span>
                    <span className="font-body text-xs font-semibold text-gold">×{item.qty}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Hall Rental & Conference */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <motion.div
            className="rounded-xl border border-border bg-card p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 font-display text-lg text-gold">Hall Rental</h4>
            <div className="space-y-2">
              {hallRental.map((r, i) => (
                <div key={i} className="flex justify-between border-b border-border/30 py-2 last:border-0">
                  <span className="font-body text-sm text-foreground/70">{r.persons} persons</span>
                  <span className="font-body text-sm font-semibold text-gold">{r.rental}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-card p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-4 font-display text-lg text-gold">Conference Aids</h4>
            <div className="space-y-2">
              {conferenceAids.map((c, i) => (
                <div key={i} className="flex justify-between border-b border-border/30 py-2 last:border-0">
                  <span className="font-body text-sm text-foreground/70">{c.item}</span>
                  <span className="font-body text-sm font-semibold text-gold">{c.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block bg-gold-gradient rounded px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-gold"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default BanquetSection;
