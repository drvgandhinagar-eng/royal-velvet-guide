import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
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
            { icon: Phone, label: "Call Us", value: contactInfo.phone },
            { icon: MapPin, label: "Location", value: "Randesan, Gandhinagar" },
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
              <p className="mt-1 font-elegant text-base text-foreground">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Address */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
            {contactInfo.address}
          </p>
        </motion.div>

        {/* Order Online Links */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 font-body text-sm text-muted-foreground">Order Online</p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="rounded border border-border px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-gold/40 hover:text-gold"
            >
              🍽️ Zomato
            </a>
            <a
              href="#"
              className="rounded border border-border px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-gold/40 hover:text-gold"
            >
              🛵 Swiggy
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
