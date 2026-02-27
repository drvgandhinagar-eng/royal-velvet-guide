import { contactInfo } from "@/data/menuData";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/20 py-12 px-4">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-5xl text-center">
        <p className="shimmer-text font-display text-2xl font-bold inline-block">VELVET 24</p>
        <p className="mt-2 font-elegant text-sm italic text-muted-foreground">
          Multicuisine Restaurant & Banquet
        </p>

        <div className="divider-ornament mt-5 mb-5">
          <span className="ornament-diamond" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs">
          <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="font-body text-muted-foreground hover:text-gold transition-colors">
            {contactInfo.phone}
          </a>
          <span className="text-border hidden sm:inline">|</span>
          <a href={`mailto:${contactInfo.email}`} className="font-body text-muted-foreground hover:text-gold transition-colors">
            {contactInfo.email}
          </a>
          <span className="text-border hidden sm:inline">|</span>
          <a href="https://www.velvet24.in" target="_blank" rel="noopener noreferrer" className="font-body text-muted-foreground hover:text-gold transition-colors">
            www.velvet24.in
          </a>
        </div>

        <p className="mt-6 font-body text-[10px] text-muted-foreground/50 uppercase tracking-wider">
          © {new Date().getFullYear()} Velvet 24. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
