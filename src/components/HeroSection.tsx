"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  headline?: string;
  tagline?: string;
}

export default function HeroSection({
  headline = "Your Private Chauffeur Service In Stockholm",
  tagline = "Luxury · Safety · Service",
}: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background — dark gradient overlay on a placeholder; swap for Sanity heroImage */}
      <div className="absolute inset-0 bg-gradient-to-b from-limo-black via-limo-black/70 to-limo-black z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      {/* Subtle grid overlay for texture */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #C4A86A 0px, #C4A86A 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #C4A86A 0px, #C4A86A 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Tagline above headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-label text-limo-gold tracking-[0.35em] uppercase mb-6"
        >
          {tagline}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-display-2 lg:text-display-1 text-limo-white font-light leading-tight mb-8"
        >
          {headline}
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-24 h-px bg-limo-gold mx-auto mb-10"
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#fleet"
            className="inline-flex items-center justify-center px-10 py-4 border border-limo-gold text-limo-gold font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold hover:text-limo-black transition-all duration-300"
          >
            View Fleet
          </a>
          <a
            href="#booking"
            className="inline-flex items-center justify-center px-10 py-4 bg-limo-gold text-limo-black font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold-light transition-all duration-300"
          >
            Book Your Chauffeur
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-label text-limo-muted tracking-[0.2em] uppercase text-[10px]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-limo-gold" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
