import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import restaurant1 from "@/assets/restaurant-1.jpeg";
import restaurant2 from "@/assets/restaurant-2.jpeg";
import restaurant3 from "@/assets/restaurant-3.jpeg";
import restaurant4 from "@/assets/restaurant-4.jpeg";
import restaurant5 from "@/assets/restaurant-5.jpeg";
import food1 from "@/assets/food-1.jpeg";
import food2 from "@/assets/food-2.jpeg";
import food3 from "@/assets/food-3.jpeg";
import food4 from "@/assets/food-4.jpeg";
import food5 from "@/assets/food-5.jpeg";
import food6 from "@/assets/food-6.jpeg";
import food7 from "@/assets/food-7.jpeg";
import food8 from "@/assets/food-8.jpeg";
import food9 from "@/assets/food-9.jpeg";
import food10 from "@/assets/food-10.jpeg";

const ambiance = [restaurant1, restaurant5, restaurant3, restaurant4, restaurant2];
const ambianceCaptions = [
  "Elegant Dining Experience",
  "Warm & Inviting Ambiance",
  "Contemporary Design",
  "Thoughtful Details",
  "Celebration Ready",
];

const foodImages = [food4, food3, food9, food1, food2, food5, food6, food7, food8, food10];
const foodCaptions = [
  "Paneer Masala",
  "Palak Special",
  "Saag Paneer",
  "Sizzler Platter",
  "Veg Pulao",
  "Cheese Balls",
  "Baked Delight",
  "Crispy Starters",
  "Veg Biryani",
  "Creamy Special",
];

const GallerySection = () => {
  const [current, setCurrent] = useState(0);
  const [tab, setTab] = useState<"ambiance" | "food">("food");

  const images = tab === "food" ? foodImages : ambiance;
  const captions = tab === "food" ? foodCaptions : ambianceCaptions;

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  // Auto-rotate food images
  useEffect(() => {
    if (tab !== "food") return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [tab, images.length]);

  // Reset on tab switch
  useEffect(() => setCurrent(0), [tab]);

  return (
    <section id="gallery" className="relative py-28 px-4 section-glow pattern-bg">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-gold-light">
            Step Inside
          </p>
          <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-6xl">
            Our World
          </h2>
          <div className="divider-ornament mt-6">
            <span className="ornament-diamond" />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-10 flex justify-center gap-4">
          {(["food", "ambiance"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-7 py-2.5 font-body text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                tab === t
                  ? "bg-gold-gradient text-primary-foreground shadow-gold-lg"
                  : "glass-card text-muted-foreground hover:border-gold/30 hover:text-foreground"
              }`}
            >
              {t === "food" ? "🍽️ Our Dishes" : "✨ Ambiance"}
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -inset-3 rounded-2xl border border-gold/10 pointer-events-none" />
          <div className="absolute -inset-6 rounded-3xl border border-gold/5 pointer-events-none hidden md:block" />

          <div className="relative overflow-hidden rounded-xl glow-gold">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${tab}-${current}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={images[current]}
                  alt={`Velvet 24 - ${captions[current]}`}
                  className="w-full h-[300px] sm:h-[420px] md:h-[520px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-8">
                  <motion.p
                    key={`cap-${tab}-${current}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-elegant text-xl italic text-foreground/80 sm:text-2xl"
                  >
                    {captions[current]}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass-card text-foreground transition-all hover:border-gold/30 hover:shadow-gold" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass-card text-foreground transition-all hover:border-gold/30 hover:shadow-gold" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Progress dots */}
          <div className="mt-8 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current ? "w-8 bg-gold-gradient shadow-gold" : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {images.slice(0, 6).map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`group relative overflow-hidden rounded-lg transition-all duration-500 ${
                i === current ? "ring-2 ring-gold shadow-gold scale-105" : "opacity-40 hover:opacity-70 grayscale hover:grayscale-0"
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="h-14 w-20 object-cover sm:h-16 sm:w-24" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
