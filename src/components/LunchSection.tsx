import { motion } from "framer-motion";
import { lunchMenus } from "@/data/menuData";

const LunchSection = () => {
  return (
    <section className="relative py-24 px-4 bg-secondary/30">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-gold-light">
            Value for Excellence
          </p>
          <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-5xl">
            Lunch Specials
          </h2>
          <div className="mx-auto mt-4 divider-gold w-32" />
          <p className="mt-4 font-body text-sm text-muted-foreground">
            Available 11:00 AM – 3:00 PM
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {lunchMenus.map((menu, i) => (
            <motion.div
              key={menu.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all hover:border-gold/30 hover:shadow-gold"
            >
              <div className="mb-4 text-center">
                <h3 className="font-display text-xl text-foreground">{menu.title}</h3>
                <p className="mt-2 font-display text-3xl font-bold text-gold">{menu.price}</p>
              </div>
              <div className="divider-gold mx-auto w-12 mb-4" />
              <p className="font-body text-xs leading-relaxed text-muted-foreground text-center">
                {menu.items}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LunchSection;
