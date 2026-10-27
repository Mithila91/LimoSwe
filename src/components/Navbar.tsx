"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Concierge", href: "#concierge" },
  { label: "Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-limo-black/95 backdrop-blur-md border-b border-limo-border shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-2xl font-light tracking-[0.12em] text-limo-white group-hover:text-limo-gold transition-colors duration-300">
              LIMO
            </span>
            <span className="font-sans text-[0.55rem] tracking-[0.3em] text-limo-gold uppercase">
              Sweden
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-label text-limo-muted hover:text-limo-gold tracking-[0.15em] uppercase transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+46101717117"
              className="hidden sm:flex items-center gap-2 text-limo-gold hover:text-limo-gold-light transition-colors duration-300"
            >
              <Phone size={14} strokeWidth={1.5} />
              <span className="font-sans text-body-small tracking-wide">
                +4610 17 17 117
              </span>
            </a>

            <button
              className="lg:hidden text-limo-white hover:text-limo-gold transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-limo-black flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-serif text-display-3 text-limo-white hover:text-limo-gold transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-12 pt-8 border-t border-limo-border">
              <a
                href="tel:+46101717117"
                className="flex items-center gap-3 text-limo-gold"
              >
                <Phone size={16} strokeWidth={1.5} />
                <span className="font-sans text-body-large">+4610 17 17 117</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
