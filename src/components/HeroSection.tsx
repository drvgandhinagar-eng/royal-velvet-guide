import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Utensils, Users, Star } from "lucide-react";
import restaurant1 from "@/assets/restaurant-1.jpeg";
import restaurant5 from "@/assets/restaurant-5.jpeg";
import food4 from "@/assets/food-4.jpeg";
import food3 from "@/assets/food-3.jpeg";
import food1 from "@/assets/food-1.jpeg";

const heroImages = [food4, restaurant1, food3, restaurant5, food1];

const stats = [
  { icon: Utensils, value: "200+", label: "Menu Items" },
  { icon: Users, value: "400", label: "Banquet Capacity" },
  { icon: Star, value: "4.5", label: "Rating" },
];

const HeroSection = () => {
  const [bgIdx, setBgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with crossfade */}
      {heroImages.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === bgIdx ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <img
            src={img}
            alt="Velvet 24 restaurant"
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />

      {/* Decorative corner elements */}
      <div className="absolute top-20 left-8 hidden lg:block">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>
      <div className="absolute top-20 right-8 hidden lg:block">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="divider-ornament mb-6">
            <span className="ornament-diamond" />
          </div>
          <p className="font-body text-xs font-light uppercase tracking-[0.5em] text-gold-light sm:text-sm">
            Multicuisine Restaurant & Banquet
          </p>
        </motion.div>

        <motion.h1
          className="shimmer-text font-display text-6xl font-bold leading-none sm:text-7xl md:text-8xl lg:text-[10rem]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          VELVET 24
        </motion.h1>

        <motion.div
          className="mt-6 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/50 sm:w-20" />
          <p className="font-elegant text-lg italic text-foreground/60 sm:text-xl md:text-2xl">
            The Taste of Culture
          </p>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/50 sm:w-20" />
        </motion.div>

        <motion.p
          className="mt-3 font-body text-[11px] tracking-widest text-muted-foreground uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Gandhinagar, Gujarat
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a
            href="#menu"
            className="group relative overflow-hidden bg-gold-gradient rounded-lg px-10 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-gold-lg"
          >
            <span className="relative z-10">Explore Menu</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
          <a
            href="#banquet"
            className="rounded-lg border border-gold/30 px-10 py-3.5 font-body text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:border-gold hover:bg-gold/5 hover:shadow-gold"
          >
            Book Banquet
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 flex items-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <stat.icon className="h-4 w-4 text-gold/60" />
              <div>
                <p className="font-display text-lg font-bold text-foreground sm:text-xl">{stat.value}</p>
                <p className="font-body text-[9px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              </div>
              {i < stats.length - 1 && (
                <div className="ml-8 hidden h-8 w-[1px] bg-border/40 sm:ml-12 sm:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <span className="font-body text-[9px] uppercase tracking-[0.3em] text-gold/40">Scroll</span>
        <ChevronDown className="h-4 w-4 text-gold/40" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
