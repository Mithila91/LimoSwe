"use client";

import { useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import type { Vehicle } from "@/types";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone number required"),
  vehicle: z.string().optional(),
  luggage: z.string().optional(),
  concierge: z.boolean().optional(),
  message: z.string().min(10, "Please provide some detail about your booking"),
  newsletter: z.boolean().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingSectionProps {
  vehicles: Vehicle[];
}

export default function BookingSection({ vehicles }: BookingSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // handle error
    } finally {
      setSubmitting(false);
    }
  };

  const anim = (props: object) => shouldReduceMotion ? {} : props;

  const inputClass =
    "w-full bg-limo-surface border border-limo-border focus:border-limo-gold focus-visible:ring-2 focus-visible:ring-limo-gold/50 outline-none px-4 py-3 font-sans text-body-base text-limo-white placeholder:text-limo-muted transition-colors duration-200";
  const labelClass =
    "block font-sans text-label text-limo-muted tracking-[0.15em] uppercase mb-2";
  const errorClass = "font-sans text-[11px] text-red-400 mt-1";

  return (
    <section id="booking" className="section-divider py-28 lg:py-36 px-6">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.p
          {...anim({ initial: { opacity: 0 }, animate: inView ? { opacity: 1 } : {}, transition: { duration: 0.6 } })}
          className="font-sans text-label text-limo-gold tracking-[0.35em] uppercase mb-4"
        >
          Reservations
        </motion.p>

        <motion.h2
          {...anim({ initial: { opacity: 0, y: 20 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay: 0.1 } })}
          className="font-serif text-display-3 text-limo-white font-light mb-4"
        >
          Book Your Chauffeur
        </motion.h2>

        <motion.div
          {...anim({ initial: { scaleX: 0 }, animate: inView ? { scaleX: 1 } : {}, transition: { duration: 0.7, delay: 0.3 } })}
          className="w-16 h-px bg-limo-gold mb-12 origin-left"
        />

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="text-center py-16 border border-limo-gold/30 bg-limo-surface"
          >
            <CheckCircle size={40} strokeWidth={1} className="text-limo-gold mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-serif text-heading-1 text-limo-white font-light mb-3">
              Request Received
            </h3>
            <p className="font-sans text-body-base text-limo-muted">
              We&apos;ll be in touch within the hour. For urgent bookings, call{" "}
              <a href="tel:+46101717117" className="text-limo-gold hover:text-limo-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-limo-gold">
                +4610 17 17 117
              </a>
            </p>
          </div>
        ) : (
          <motion.form
            {...anim({ initial: { opacity: 0, y: 20 }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay: 0.4 } })}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            noValidate
            aria-label="Booking request form"
          >
            {/* Row 1 */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                <input
                  {...register("name")}
                  id="name"
                  placeholder="Your name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClass}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className={errorClass}>{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClass}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className={errorClass}>{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className={labelClass}>Phone <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                <input
                  {...register("phone")}
                  id="phone"
                  type="tel"
                  placeholder="+46 ..."
                  autoComplete="tel"
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={inputClass}
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className={errorClass}>{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="vehicle" className={labelClass}>Preferred Vehicle</label>
                <select {...register("vehicle")} id="vehicle" className={inputClass}>
                  <option value="">Any vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v._id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <label htmlFor="luggage" className={labelClass}>Luggage</label>
              <select {...register("luggage")} id="luggage" className={inputClass}>
                <option value="">Select luggage amount</option>
                <option value="1-2">1–2 bags</option>
                <option value="3-4">3–4 bags</option>
                <option value="5+">5+ bags</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass}>Message / Booking Details <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                placeholder="Date, time, pickup/dropoff location, any special requests..."
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p id="message-error" role="alert" className={errorClass}>{errors.message.message}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  {...register("concierge")}
                  type="checkbox"
                  className="accent-limo-gold w-4 h-4 focus-visible:ring-2 focus-visible:ring-limo-gold"
                />
                <span className="font-sans text-body-small text-limo-muted group-hover:text-limo-white transition-colors">
                  I&apos;m interested in 24/7 concierge services
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  {...register("newsletter")}
                  type="checkbox"
                  className="accent-limo-gold w-4 h-4 focus-visible:ring-2 focus-visible:ring-limo-gold"
                />
                <span className="font-sans text-body-small text-limo-muted group-hover:text-limo-white transition-colors">
                  Subscribe to exclusive offers &amp; updates
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-3 px-10 py-4 bg-limo-gold text-limo-black font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold-light focus-visible:ring-2 focus-visible:ring-limo-gold focus-visible:ring-offset-2 focus-visible:ring-offset-limo-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-disabled={submitting}
            >
              {submitting ? (
                <span aria-live="polite">Sending...</span>
              ) : (
                <>
                  <Send size={14} strokeWidth={1.5} aria-hidden="true" />
                  Send Booking Request
                </>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
