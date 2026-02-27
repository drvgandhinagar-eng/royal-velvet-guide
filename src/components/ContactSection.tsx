import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, Navigation, Globe } from "lucide-react";
import { contactInfo } from "@/data/menuData";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-28 px-4 pattern-bg section-glow">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-gold-light">
            We'd Love To Hear From You
          </p>
          <h2 className="font-display text-4xl font-bold text-gold-gradient md:text-6xl">
            Get In Touch
          </h2>
          <div className="divider-ornament mt-6">
            <span className="ornament-diamond" />
          </div>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, label: "Call Us", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
            { icon: Mail, label: "Email", value: "Velvet24restaurant\n@gmail.com", href: `mailto:${contactInfo.email}` },
            { icon: Clock, label: "Lunch", value: contactInfo.hours.lunch },
            { icon: Clock, label: "Dinner", value: contactInfo.hours.dinner },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-hover rounded-2xl p-7 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                <item.icon className="h-5 w-5 text-gold" />
              </div>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="mt-2 block font-elegant text-base text-foreground hover:text-gold transition-colors whitespace-pre-line">
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 font-elegant text-base text-foreground">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Address + Directions */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-start gap-3 glass-card rounded-2xl px-8 py-5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <p className="font-body text-xs text-muted-foreground leading-relaxed text-left max-w-sm">
              {contactInfo.address}
            </p>
          </div>
          <div className="mt-5">
            <a
              href={contactInfo.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-gold/30 px-6 py-3 font-body text-xs font-semibold uppercase tracking-wider text-gold transition-all hover:bg-gold/10 hover:border-gold hover:shadow-gold"
            >
              <Navigation className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Get Directions
            </a>
          </div>
        </motion.div>

        {/* Order Online Links */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="mb-5 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">Order Online</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={contactInfo.zomatoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card-hover rounded-xl px-8 py-4 font-body text-sm font-semibold text-foreground"
            >
              🍽️ <span className="group-hover:text-gold transition-colors">Zomato</span>
            </a>
            <a
              href={contactInfo.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card-hover rounded-xl px-8 py-4 font-body text-sm font-semibold text-foreground"
            >
              🛵 <span className="group-hover:text-gold transition-colors">Swiggy</span>
            </a>
          </div>
        </motion.div>

        {/* Website */}
        <motion.div
          className="mt-8 text-center"
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

        {/* Map */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="overflow-hidden rounded-2xl border border-gold/10 shadow-gold">
            <iframe
              title="Velvet 24 Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.5!2d72.636!3d23.185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2a5098decddb%3A0x398f1a1908e4fcd3!2sVelvet%2024%20-%20The%20Taste%20of%20Culture!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
