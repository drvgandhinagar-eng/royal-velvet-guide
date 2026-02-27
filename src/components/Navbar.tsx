import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { contactInfo } from "@/data/menuData";

const navLinks = [
  { label: "Gallery", href: "#gallery" },
  { label: "Menu", href: "#menu" },
  { label: "Specials", href: "#specials" },
  { label: "Banquet", href: "#banquet" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) {
        setOrderOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-dark border-b border-border/30" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl font-bold text-gold">
          VELVET 24
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-xs uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}

          {/* Order Now dropdown */}
          <div className="relative" ref={orderRef}>
            <button
              onClick={() => setOrderOpen(!orderOpen)}
              className="flex items-center gap-2 bg-gold-gradient rounded px-5 py-2 font-body text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-gold"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Order Now
            </button>
            <AnimatePresence>
              {orderOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-border bg-card shadow-luxury"
                >
                  <a
                    href={contactInfo.zomatoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 font-body text-sm text-foreground transition-colors hover:bg-secondary hover:text-gold"
                  >
                    🍽️ Order on Zomato
                  </a>
                  <div className="divider-gold" />
                  <a
                    href={contactInfo.swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 font-body text-sm text-foreground transition-colors hover:bg-secondary hover:text-gold"
                  >
                    🛵 Order on Swiggy
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass-dark border-t border-border/20 md:hidden"
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm uppercase tracking-wider text-foreground/70 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <div className="divider-gold my-2" />
            <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">Order Online</p>
            <a
              href={contactInfo.zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="font-body text-sm text-foreground/70 hover:text-gold"
            >
              🍽️ Zomato
            </a>
            <a
              href={contactInfo.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="font-body text-sm text-foreground/70 hover:text-gold"
            >
              🛵 Swiggy
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
