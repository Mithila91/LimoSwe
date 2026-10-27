"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Users, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/imageUrl";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export default function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const imageUrl = vehicle.heroImage
    ? urlFor(vehicle.heroImage).width(800).height(520).auto("format").url()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link
        href={`/fleet/${vehicle.slug}`}
        className="group block bg-limo-surface border border-limo-border hover:border-limo-gold/40 transition-all duration-500 overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-limo-border">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={vehicle.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-limo-border to-limo-surface flex items-center justify-center">
              <span className="font-sans text-label text-limo-muted tracking-widest uppercase">
                No Image
              </span>
            </div>
          )}

          {/* Eco badge */}
          {vehicle.eco && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-limo-black/80 backdrop-blur-sm px-2.5 py-1 border border-limo-gold/30">
              <Leaf size={11} className="text-limo-gold" strokeWidth={1.5} />
              <span className="font-sans text-[10px] tracking-[0.15em] text-limo-gold uppercase">
                Eco
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-limo-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-serif text-heading-3 text-limo-white font-light group-hover:text-limo-gold transition-colors duration-300">
              {vehicle.name}
            </h3>
            <ArrowRight
              size={16}
              strokeWidth={1}
              className="text-limo-muted group-hover:text-limo-gold group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
            />
          </div>

          {vehicle.shortDescription && (
            <p className="font-sans text-body-small text-limo-muted leading-relaxed mb-4 line-clamp-2">
              {vehicle.shortDescription}
            </p>
          )}

          <div className="flex items-center gap-4 pt-4 border-t border-limo-border">
            {vehicle.capacity && (
              <div className="flex items-center gap-1.5">
                <Users size={13} strokeWidth={1.5} className="text-limo-steel" />
                <span className="font-sans text-body-small text-limo-muted">
                  {vehicle.capacity} passengers
                </span>
              </div>
            )}
            <span
              className={cn(
                "ml-auto font-sans text-label text-[10px] tracking-[0.12em] uppercase text-limo-steel"
              )}
            >
              View Details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
