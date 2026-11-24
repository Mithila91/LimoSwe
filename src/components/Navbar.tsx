"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
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
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const menuAnim = shouldReduceMotion
    ? { initial: {}, animate: {}, exit: {} }
    : { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-limo-gold focus:text-limo-black focus:font-sans focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-limo-black/95 backdrop-blur-md border-b border-limo-border shadow-lg"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold focus-visible:outline-offset-4"
            aria-label="Limousine Sweden — go to homepage"
          >
            <Image
              src="/limoswelogo.png"
              alt="Limousine Sweden"
              width={140}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-label text-limo-muted hover:text-limo-gold tracking-[0.15em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold focus-visible:outline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+46101717117"
              className="hidden sm:flex items-center gap-2 text-limo-gold hover:text-limo-gold-light transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold focus-visible:outline-offset-4"
              aria-label="Call us at +46 10 17 17 117"
            >
              <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
              <span className="font-sans text-body-small tracking-wide">
                +4610 17 17 117
              </span>
            </a>

            <button
              className="lg:hidden text-limo-white hover:text-limo-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold focus-visible:outline-offset-4"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            {...menuAnim}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-limo-black flex flex-col pt-24 px-8"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-serif text-display-3 text-limo-white hover:text-limo-gold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold focus-visible:outline-offset-4"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-12 pt-8 border-t border-limo-border">
              <a
                href="tel:+46101717117"
                className="flex items-center gap-3 text-limo-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold focus-visible:outline-offset-4"
                aria-label="Call us at +46 10 17 17 117"
              >
                <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                <span className="font-sans text-body-large">+4610 17 17 117</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
