"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
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

  const inputClass =
    "w-full bg-limo-surface border border-limo-border focus:border-limo-gold outline-none px-4 py-3 font-sans text-body-base text-limo-white placeholder:text-limo-muted transition-colors duration-200";
  const labelClass =
    "block font-sans text-label text-limo-muted tracking-[0.15em] uppercase mb-2";
  const errorClass = "font-sans text-[11px] text-red-400 mt-1";

  return (
    <section
      id="booking"
      className="section-divider py-28 lg:py-36 px-6"
    >
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-label text-limo-gold tracking-[0.35em] uppercase mb-4"
        >
          Reservations
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-display-3 text-limo-white font-light mb-4"
        >
          Book Your Chauffeur
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-16 h-px bg-limo-gold mb-12 origin-left"
        />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 border border-limo-gold/30 bg-limo-surface"
          >
            <CheckCircle
              size={40}
              strokeWidth={1}
              className="text-limo-gold mx-auto mb-4"
            />
            <h3 className="font-serif text-heading-1 text-limo-white font-light mb-3">
              Request Received
            </h3>
            <p className="font-sans text-body-base text-limo-muted">
              We&apos;ll be in touch within the hour. For urgent bookings, call{" "}
              <a
                href="tel:+46101717117"
                className="text-limo-gold hover:text-limo-gold-light"
              >
                +4610 17 17 117
              </a>
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Row 1 */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  {...register("name")}
                  placeholder="Your name"
                  className={inputClass}
                />
                {errors.name && (
                  <p className={errorClass}>{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className={inputClass}
                />
                {errors.email && (
                  <p className={errorClass}>{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Phone *</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+46 ..."
                  className={inputClass}
                />
                {errors.phone && (
                  <p className={errorClass}>{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Preferred Vehicle</label>
                <select {...register("vehicle")} className={inputClass}>
                  <option value="">Any vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v._id} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <label className={labelClass}>Luggage</label>
              <select {...register("luggage")} className={inputClass}>
                <option value="">Select luggage amount</option>
                <option value="1-2">1–2 bags</option>
                <option value="3-4">3–4 bags</option>
                <option value="5+">5+ bags</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className={labelClass}>Message / Booking Details *</label>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Date, time, pickup/dropoff location, any special requests..."
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p className={errorClass}>{errors.message.message}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  {...register("concierge")}
                  type="checkbox"
                  className="accent-limo-gold w-4 h-4"
                />
                <span className="font-sans text-body-small text-limo-muted group-hover:text-limo-white transition-colors">
                  I&apos;m interested in 24/7 concierge services
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  {...register("newsletter")}
                  type="checkbox"
                  className="accent-limo-gold w-4 h-4"
                />
                <span className="font-sans text-body-small text-limo-muted group-hover:text-limo-white transition-colors">
                  Subscribe to exclusive offers &amp; updates
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-3 px-10 py-4 bg-limo-gold text-limo-black font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                "Sending..."
              ) : (
                <>
                  <Send size={14} strokeWidth={1.5} />
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
