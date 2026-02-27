import { motion } from "framer-motion";
import { Users, PartyPopper, Building2 } from "lucide-react";
import banquetImage from "@/assets/banquet-hall.jpg";

const events = [
  { icon: PartyPopper, label: "Sangeet / Ring Ceremony / Wedding / Reception" },
  { icon: Users, label: "Birthday Party / Kiddy Party / Baby Shower" },
  { icon: Building2, label: "Corporate Events / Conferences / Family Gathering" },
];

const BanquetSection = () => {
  return (
    <section id="banquet" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Image */}
          <motion.div
            className="relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={banquetImage}
              alt="Velvet 24 banquet hall with chandeliers"
              className="w-full h-80 lg:h-[500px] object-cover rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-lg" />
            <div className="absolute bottom-6 left-6">
              <p className="font-display text-2xl font-bold text-gold">100 – 400 Guests</p>
              <p className="font-body text-sm text-foreground/80">Capacity for grand celebrations</p>
            </div>
          </motion.div>

          {/* Content */}
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
              magnificent banquet hall — the biggest celebration destination in town.
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

            <a
              href="#contact"
              className="mt-8 inline-block bg-gold-gradient rounded px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-gold"
            >
              Enquire Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BanquetSection;
