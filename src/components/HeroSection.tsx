"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Pause, Play } from "lucide-react";

interface HeroSectionProps {
  brandName?: string;
  headline?: string;
  tagline?: string;
  imageUrl?: string;
  videoUrl?: string;
  mediaType?: "image" | "video" | "videoUrl";
}

export default function HeroSection({
  brandName = "Limousine Sweden",
  headline = "Your Private Chauffeur Service In Stockholm",
  tagline = "Luxury · Safety · Service",
  imageUrl,
  videoUrl,
  mediaType = "image",
}: HeroSectionProps) {
  const isVideo = (mediaType === "video" || mediaType === "videoUrl") && !!videoUrl;
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPaused) {
      videoRef.current.play();
      setVideoPaused(false);
    } else {
      videoRef.current.pause();
      setVideoPaused(true);
    }
  };

  const anim = (props: object) => shouldReduceMotion ? {} : props;

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">

      {/* Background media */}
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            key={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          {/* WCAG 2.2.2: Pause control for autoplay video */}
          <button
            onClick={toggleVideo}
            aria-label={videoPaused ? "Play background video" : "Pause background video"}
            className="absolute bottom-10 right-6 z-30 text-limo-muted hover:text-limo-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold focus-visible:outline-offset-2"
          >
            {videoPaused
              ? <Play size={16} strokeWidth={1.5} aria-hidden="true" />
              : <Pause size={16} strokeWidth={1.5} aria-hidden="true" />
            }
          </button>
        </>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: imageUrl
              ? `url('${imageUrl}')`
              : "url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to bottom, rgba(5,5,10,0.85) 0%, rgba(5,5,10,0.70) 40%, rgba(5,5,10,0.92) 100%)" }} />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #C4A86A 0px, #C4A86A 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #C4A86A 0px, #C4A86A 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          {...anim({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.2 } })}
          className="font-sans text-label text-limo-gold tracking-[0.25em] uppercase mb-6 whitespace-nowrap"
        >
          {tagline}
        </motion.p>

        {brandName && (
          <motion.div
            {...anim({ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: 0.35 } })}
            className="font-serif font-light tracking-[0.08em] mb-3 text-limo-gold"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 1.1 }}
          >
            {brandName}
          </motion.div>
        )}

        <motion.h1
          {...anim({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: 0.5 } })}
          className="font-serif font-light leading-tight mb-8 text-limo-white/80"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
        >
          {headline}
        </motion.h1>

        <motion.div
          {...anim({ initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.8, delay: 0.7 } })}
          className="w-24 h-px bg-limo-gold mx-auto mb-10"
        />

        <motion.div
          {...anim({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.9 } })}
          className="flex flex-row gap-3 justify-center flex-wrap"
        >
          <a
            href="#fleet"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-10 sm:py-4 border border-limo-gold text-limo-gold font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold hover:text-limo-black transition-all duration-300 text-[10px] sm:text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold focus-visible:outline-offset-2"
          >
            View Fleet
          </a>
          <a
            href="#booking"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-10 sm:py-4 bg-limo-gold text-limo-black font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold-light transition-all duration-300 text-[10px] sm:text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Book Your Chauffeur
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...anim({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.5 } })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-sans text-label text-limo-muted tracking-[0.2em] uppercase text-[10px]">
          Scroll
        </span>
        <motion.div
          {...anim({ animate: { y: [0, 6, 0] }, transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } })}
        >
          <ChevronDown size={16} className="text-limo-gold" strokeWidth={1} aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
