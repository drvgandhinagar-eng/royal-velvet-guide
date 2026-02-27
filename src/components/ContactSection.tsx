import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, Navigation, Globe } from "lucide-react";
import { contactInfo } from "@/data/menuData";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24 px-4 bg-secondary/30">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-gold-light">
            We'd Love To Hear From You
          </p>
          <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-5xl">
            Get In Touch
          </h2>
          <div className="mx-auto mt-4 divider-gold w-32" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, label: "Call Us", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
            { icon: Mail, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
            { icon: Clock, label: "Lunch", value: contactInfo.hours.lunch },
            { icon: Clock, label: "Dinner", value: contactInfo.hours.dinner },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-gold/30"
            >
              <item.icon className="mx-auto mb-3 h-6 w-6 text-gold" />
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="mt-1 block font-elegant text-base text-foreground hover:text-gold transition-colors">
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 font-elegant text-base text-foreground">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Address + Directions */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-gold" />
            <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-md">
              {contactInfo.address}
            </p>
          </div>
          <a
            href={contactInfo.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 rounded border border-gold/30 px-5 py-2 font-body text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold/10 hover:border-gold"
          >
            <Navigation className="h-3.5 w-3.5" />
            Get Directions
          </a>
        </motion.div>

        {/* Order Online Links */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 font-body text-sm text-muted-foreground">Order Online</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={contactInfo.zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-gold/40 hover:text-gold"
            >
              🍽️ Zomato
            </a>
            <a
              href={contactInfo.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-gold/40 hover:text-gold"
            >
              🛵 Swiggy
            </a>
          </div>
        </motion.div>

        {/* Website */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.velvet24.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-gold transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            {contactInfo.website}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
