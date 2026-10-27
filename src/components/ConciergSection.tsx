"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Phone } from "lucide-react";

const offerings = [
  "Private jet & yacht arrangements",
  "Exclusive event planning",
  "Fine dining reservations",
  "Personal errands & shopping",
  "Entertainment & ticketing",
  "Guided Stockholm experiences",
];

export default function ConciergSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="concierge"
      className="relative section-divider py-28 lg:py-36 px-6 overflow-hidden"
    >
      {/* Faint background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-limo-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Sparkles size={14} className="text-limo-gold" strokeWidth={1} />
              <span className="font-sans text-label text-limo-gold tracking-[0.35em] uppercase">
                24/7 Concierge
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-display-3 text-limo-white font-light leading-tight mb-6"
            >
              Beyond the
              <br />
              <em className="text-limo-gold not-italic">Journey</em>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-16 h-px bg-limo-gold mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-sans text-body-large text-limo-muted leading-relaxed mb-10"
            >
              Our round-the-clock concierge service extends far beyond
              transportation. From private jet arrangements to exclusive dining
              reservations — we handle every detail so you can focus on what
              matters.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-limo-gold text-limo-gold font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold hover:text-limo-black transition-all duration-300"
            >
              <Phone size={14} strokeWidth={1.5} />
              Contact Us Today
            </motion.a>
          </div>

          {/* Right — offering list */}
          <div className="flex flex-col gap-4">
            {offerings.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.09 }}
                className="flex items-center gap-4 p-5 border border-limo-border hover:border-limo-gold/40 transition-colors duration-300 group"
              >
                <div className="w-1 h-full min-h-[1rem] bg-limo-gold/30 group-hover:bg-limo-gold transition-colors duration-300" />
                <span className="font-sans text-body-base text-limo-white/80 group-hover:text-limo-white transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
