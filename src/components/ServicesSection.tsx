"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Plane,
  Heart,
  MapPin,
  Star,
  Route,
  ShoppingBag,
  Navigation,
  Car,
} from "lucide-react";
import type { Service } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  plane: Plane,
  heart: Heart,
  mappin: MapPin,
  star: Star,
  route: Route,
  shoppingbag: ShoppingBag,
  navigation: Navigation,
  car: Car,
};

function getIcon(iconName?: string): React.ElementType {
  if (!iconName) return Car;
  const key = iconName.toLowerCase().replace(/[^a-z]/g, "");
  return ICON_MAP[key] || Car;
}

interface ServicesSectionProps {
  services: Service[];
}

// Fallback services if Sanity is empty
const FALLBACK_SERVICES: Service[] = [
  { _id: "1", title: "Airport Transfer", icon: "plane", description: "Fixed-price transfers to and from Stockholm Arlanda and Bromma airports." },
  { _id: "2", title: "Wedding Car", icon: "heart", description: "Arrive in elegance on your most important day with our luxury fleet." },
  { _id: "3", title: "Guided Tours", icon: "mappin", description: "Explore Stockholm and Sweden with a knowledgeable, multilingual chauffeur." },
  { _id: "4", title: "VIP Access", icon: "star", description: "Exclusive connections to Stockholm's finest restaurants and nightlife." },
  { _id: "5", title: "Point-to-Point", icon: "route", description: "Reliable city-to-city and long-distance transfers across Sweden and Europe." },
  { _id: "6", title: "Personal Shopping", icon: "shoppingbag", description: "Your personal chauffeur accompanies you for a seamless shopping experience." },
  { _id: "7", title: "City-to-City", icon: "navigation", description: "Comfortable long-distance transfers between Swedish and European cities." },
  { _id: "8", title: "Your Car, Our Driver", icon: "car", description: "Prefer your own vehicle? Our professional chauffeurs will drive it for you." },
];

export default function ServicesSection({ services }: ServicesSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section id="services" className="section-divider py-28 lg:py-36 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-label text-limo-gold tracking-[0.35em] uppercase mb-4"
        >
          Services
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-display-3 text-limo-white font-light mb-4"
        >
          How We Serve You
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-16 h-px bg-limo-gold mb-16 origin-left"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-limo-border">
          {displayServices.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                className="bg-limo-black p-8 group hover:bg-limo-surface transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-limo-gold/30 group-hover:border-limo-gold flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon size={18} strokeWidth={1} className="text-limo-gold" />
                </div>
                <h3 className="font-serif text-heading-3 text-limo-white font-light mb-3 group-hover:text-limo-gold transition-colors duration-300">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="font-sans text-body-small text-limo-muted leading-relaxed">
                    {service.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
