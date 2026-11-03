"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, ExternalLink } from "lucide-react";
import type { Testimonial } from "@/types";

const FALLBACK: Testimonial[] = [
  {
    _id: "1",
    author: "Joe Hawrylak",
    body: "Exceptional service from start to finish. Our chauffeur was 15 minutes early, immaculately presented, and had researched our preferences in advance. The Rolls Royce Ghost was immaculate. Truly world-class.",
    rating: 5,
    source: "google",
  },
  {
    _id: "2",
    author: "Sophia L.",
    body: "Used Limo Sweden for an airport transfer and a guided city tour. Punctual, professional, and the vehicle was pristine. Already booked for our next visit to Stockholm.",
    rating: 5,
    source: "google",
  },
  {
    _id: "3",
    author: "Marcus T.",
    body: "The 24/7 concierge service is genuinely impressive. They arranged everything — from the restaurant booking to the private airport lounge. Nothing was too much trouble.",
    rating: 5,
    source: "google",
  },
];

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  googleBusinessUrl?: string;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="currentColor" strokeWidth={0} className="text-limo-gold" />
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  testimonials,
  googleBusinessUrl,
}: TestimonialsSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const display = testimonials.length > 0 ? testimonials : FALLBACK;

  return (
    <section className="section-divider py-28 lg:py-36 px-6 bg-limo-surface">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-label text-limo-gold tracking-[0.35em] uppercase mb-4"
        >
          Testimonials
        </motion.p>

        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-display-3 text-limo-white font-light"
          >
            What Our Clients Say
          </motion.h2>

          {googleBusinessUrl && (
            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-label text-limo-muted hover:text-limo-gold tracking-[0.15em] uppercase transition-colors duration-300"
            >
              Read all reviews
              <ExternalLink size={12} strokeWidth={1.5} />
            </motion.a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {display.map((t, i) => {
            const Card = (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className={`p-8 border bg-limo-black flex flex-col h-full transition-colors duration-300 ${
                  t.reviewUrl
                    ? "border-limo-border hover:border-limo-gold/40 cursor-pointer"
                    : "border-limo-border"
                }`}
              >
                <Stars count={t.rating} />
                <blockquote className="font-serif text-body-large text-limo-white/90 font-light italic leading-relaxed mt-6 flex-1">
                  <span className="line-clamp-3">&ldquo;{t.body}&rdquo;</span>
                </blockquote>

                {t.reviewUrl && (
                  <span className="inline-flex items-center gap-1.5 font-sans text-body-small text-limo-gold/70 hover:text-limo-gold transition-colors mt-3">
                    Read on Google
                    <ExternalLink size={11} strokeWidth={1.5} />
                  </span>
                )}

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-limo-border">
                  <span className="font-sans text-body-small text-limo-white font-medium">
                    {t.author}
                  </span>
                  {t.source === "google" && (
                    <span className="font-sans text-label text-limo-muted tracking-[0.1em] uppercase text-[10px]">
                      Google
                    </span>
                  )}
                </div>
              </motion.div>
            );

            return t.reviewUrl ? (
              <a
                key={t._id}
                href={t.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {Card}
              </a>
            ) : (
              <div key={t._id}>{Card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
