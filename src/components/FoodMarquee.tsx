import { useEffect, useRef } from "react";
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
import food11 from "@/assets/food-11.jpeg";
import food12 from "@/assets/food-12.jpeg";
import food13 from "@/assets/food-13.jpeg";
import food14 from "@/assets/food-14.jpeg";
import food15 from "@/assets/food-15.jpeg";
import food16 from "@/assets/food-16.jpeg";
import food17 from "@/assets/food-17.jpeg";
import food18 from "@/assets/food-18.jpeg";
import food19 from "@/assets/food-19.jpeg";
import food20 from "@/assets/food-20.jpeg";

const row1 = [food4, food13, food9, food1, food11, food15, food3, food17, food19, food16];
const row2 = [food2, food14, food5, food18, food10, food12, food6, food20, food7, food8];

const MarqueeRow = ({ images, reverse = false }: { images: string[]; reverse?: boolean }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf: number;
    let pos = 0;
    const speed = reverse ? 0.5 : -0.5;
    const halfWidth = el.scrollWidth / 2;

    const animate = () => {
      pos += speed;
      if (!reverse && pos <= -halfWidth) pos = 0;
      if (reverse && pos >= 0) pos = -halfWidth;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    // Start from correct position for reverse
    if (reverse) pos = -halfWidth;
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);

  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex w-max" style={{ willChange: "transform" }}>
        {doubled.map((img, i) => (
          <div
            key={i}
            className="mx-3 h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-gold/20 shadow-gold transition-transform hover:scale-110 hover:border-gold/50 sm:h-24 sm:w-24"
          >
            <img src={img} alt="Velvet 24 dish" className="h-full w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

const FoodMarquee = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="mb-8 text-center">
        <p className="font-body text-xs uppercase tracking-[0.4em] text-gold-light">
          Crafted With Love
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold text-gold-gradient md:text-4xl">
          A Taste Preview
        </h3>
        <div className="divider-ornament mt-4">
          <span className="ornament-diamond" />
        </div>
      </div>

      <div className="space-y-5">
        <MarqueeRow images={row1} />
        <MarqueeRow images={row2} reverse />
      </div>
    </section>
  );
};

export default FoodMarquee;
