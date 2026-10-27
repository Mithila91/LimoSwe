"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import VehicleCard from "./VehicleCard";
import type { Vehicle, VehicleClass } from "@/types";
import { VEHICLE_CLASS_LABELS } from "@/types";

interface FleetSectionProps {
  vehicles: Vehicle[];
}

const CLASS_ORDER: VehicleClass[] = [
  "luxury",
  "executive",
  "van-suv",
  "business",
  "stretch",
  "vip-bus",
];

export default function FleetSection({ vehicles }: FleetSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Group by class preserving order
  const grouped = CLASS_ORDER.reduce(
    (acc, cls) => {
      const items = vehicles.filter((v) => v.vehicleClass === cls);
      if (items.length > 0) acc[cls] = items;
      return acc;
    },
    {} as Partial<Record<VehicleClass, Vehicle[]>>
  );

  return (
    <section id="fleet" className="section-divider py-28 lg:py-36 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-sans text-label text-limo-gold tracking-[0.35em] uppercase mb-4"
        >
          Our Fleet
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-display-3 text-limo-white font-light mb-4"
        >
          World-Class Vehicles
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-16 h-px bg-limo-gold mb-16 origin-left"
        />

        {/* Groups */}
        {Object.entries(grouped).map(([cls, items]) => (
          <div key={cls} className="mb-20 last:mb-0">
            <div className="flex items-center gap-6 mb-8">
              <h3 className="font-sans text-label text-limo-steel tracking-[0.25em] uppercase whitespace-nowrap">
                {VEHICLE_CLASS_LABELS[cls as VehicleClass]}
              </h3>
              <div className="flex-1 h-px bg-limo-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((vehicle, i) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} index={i} />
              ))}
            </div>
          </div>
        ))}

        {vehicles.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-sans text-body-large text-limo-muted">
              Fleet coming soon — check back shortly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
