"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Star, Globe } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Safety First",
    body: "All chauffeurs are professionally vetted, background-checked, and trained to the highest standards.",
  },
  {
    icon: Star,
    title: "Unrivalled Luxury",
    body: "From Rolls Royce to Mercedes-Maybach — every vehicle in our fleet is meticulously maintained.",
  },
  {
    icon: Globe,
    title: "Multilingual Service",
    body: "Our chauffeurs speak multiple languages to ensure seamless communication for our international clients.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-divider py-28 lg:py-36 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-label text-limo-gold tracking-[0.35em] uppercase mb-4"
        >
          About Us
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-serif text-display-3 text-limo-white font-light leading-tight mb-6">
              Stockholm&apos;s Premier
              <br />
              <em className="text-limo-gold not-italic">Private Chauffeur</em>
            </h2>
            <div className="w-16 h-px bg-limo-gold mb-8" />
            <p className="font-sans text-body-large text-limo-muted leading-relaxed mb-6">
              For discerning clients who expect nothing less than perfection, Limo
              Sweden delivers a seamless luxury transportation experience across
              Stockholm and beyond.
            </p>
            <p className="font-sans text-body-base text-limo-muted leading-relaxed">
              Our professionally vetted, multilingual chauffeurs don&apos;t just
              drive — they anticipate your needs, provide local expertise, and
              ensure every journey is an experience in itself. Whether it&apos;s
              an airport transfer, corporate event, or a guided tour of Stockholm,
              we arrive 15 minutes early, every time.
            </p>
          </motion.div>

          {/* Right — pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className="flex gap-5 items-start"
              >
                <div className="flex-shrink-0 w-10 h-10 border border-limo-gold/40 flex items-center justify-center">
                  <pillar.icon
                    size={18}
                    strokeWidth={1}
                    className="text-limo-gold"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-heading-3 text-limo-white font-light mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-body-small text-limo-muted leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
