import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Velvet 24 luxurious restaurant interior"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="mb-4 font-body text-sm font-light uppercase tracking-[0.4em] text-gold-light">
            Multicuisine Restaurant & Banquet
          </p>
        </motion.div>

        <motion.h1
          className="font-display text-6xl font-bold leading-tight text-gold-gradient sm:text-7xl md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          VELVET 24
        </motion.h1>

        <motion.div
          className="mt-6 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <span className="divider-gold w-16" />
          <p className="font-elegant text-xl italic text-foreground/70 md:text-2xl">
            The Taste of Culture
          </p>
          <span className="divider-gold w-16" />
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="#menu"
            className="bg-gold-gradient rounded px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-gold"
          >
            Explore Menu
          </a>
          <a
            href="#banquet"
            className="rounded border border-gold/30 px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-gold transition-all hover:border-gold hover:bg-gold/5"
          >
            Book Banquet
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-6 w-6 text-gold/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
