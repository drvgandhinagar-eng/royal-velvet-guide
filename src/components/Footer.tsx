const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-8 px-4 text-center">
      <p className="font-display text-lg text-gold">VELVET 24</p>
      <p className="mt-1 font-body text-xs text-muted-foreground">
        Multicuisine Restaurant & Banquet
      </p>
      <div className="mx-auto mt-3 divider-gold w-16" />
      <p className="mt-3 font-body text-[10px] text-muted-foreground">
        © {new Date().getFullYear()} Velvet 24. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
