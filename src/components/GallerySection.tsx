import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import restaurant1 from "@/assets/restaurant-1.jpeg";
import restaurant2 from "@/assets/restaurant-2.jpeg";
import restaurant3 from "@/assets/restaurant-3.jpeg";
import restaurant4 from "@/assets/restaurant-4.jpeg";
import restaurant5 from "@/assets/restaurant-5.jpeg";

const images = [restaurant1, restaurant5, restaurant3, restaurant4, restaurant2];

const GallerySection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <section id="gallery" className="relative py-24 px-4 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-gold-light">
            Step Inside
          </p>
          <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-5xl">
            Our Space
          </h2>
          <div className="mx-auto mt-4 divider-gold w-32" />
        </motion.div>

        {/* Main Image */}
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`Velvet 24 interior view ${current + 1}`}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-xl"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur transition-all hover:bg-background/80"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur transition-all hover:bg-background/80"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-gold" : "w-2 bg-foreground/30"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-6 flex justify-center gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`overflow-hidden rounded-lg border-2 transition-all ${
                i === current ? "border-gold shadow-gold" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="h-14 w-20 object-cover sm:h-16 sm:w-24"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
