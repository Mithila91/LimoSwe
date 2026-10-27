import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Users, Briefcase, CheckCircle } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import {
  vehicleBySlugQuery,
  allVehicleSlugsQuery,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/imageUrl";
import { VEHICLE_CLASS_LABELS } from "@/types";
import type { Vehicle } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(allVehicleSlugsQuery);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await client.fetch<Vehicle>(vehicleBySlugQuery, { slug });
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} — Private Chauffeur Stockholm`,
    description:
      vehicle.shortDescription ||
      `Book the ${vehicle.name} with Limo Sweden — premium private chauffeur service in Stockholm.`,
    openGraph: {
      images: vehicle.heroImage
        ? [urlFor(vehicle.heroImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await client.fetch<Vehicle>(vehicleBySlugQuery, { slug });

  if (!vehicle) notFound();

  const heroUrl = vehicle.heroImage
    ? urlFor(vehicle.heroImage).width(1600).height(900).auto("format").url()
    : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-limo-black pt-20">
        {/* Hero */}
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          {heroUrl ? (
            <Image
              src={heroUrl}
              alt={vehicle.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-limo-surface" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-limo-black via-limo-black/40 to-transparent" />

          <div className="absolute bottom-10 left-6 lg:left-16 z-10">
            <p className="font-sans text-label text-limo-gold tracking-[0.3em] uppercase mb-3">
              {vehicle.vehicleClass
                ? VEHICLE_CLASS_LABELS[vehicle.vehicleClass]
                : ""}
            </p>
            <h1 className="font-serif text-display-2 text-limo-white font-light">
              {vehicle.name}
            </h1>
            {vehicle.eco && (
              <div className="flex items-center gap-2 mt-3">
                <Leaf size={13} className="text-limo-gold" strokeWidth={1.5} />
                <span className="font-sans text-label text-limo-gold tracking-[0.15em] uppercase text-[10px]">
                  Eco / Electric
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20">
          <Link
            href="/#fleet"
            className="inline-flex items-center gap-2 font-sans text-body-small text-limo-muted hover:text-limo-gold transition-colors mb-12"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Fleet
          </Link>

          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              {vehicle.shortDescription && (
                <p className="font-serif text-heading-2 text-limo-white/90 font-light leading-relaxed mb-8">
                  {vehicle.shortDescription}
                </p>
              )}

              {vehicle.description && (
                <div className="font-sans text-body-base text-limo-muted leading-relaxed mb-8 prose prose-invert max-w-none [&>p]:mb-4 [&>p]:text-limo-muted [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:text-limo-muted [&>h2]:font-serif [&>h2]:text-limo-white [&>h2]:text-heading-3 [&>h2]:font-light [&>h2]:mb-3">
                  <PortableText value={vehicle.description} />
                </div>
              )}

              <div className="w-16 h-px bg-limo-gold mb-10" />

              {/* Specs */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                {vehicle.capacity && (
                  <div className="flex items-center gap-3 p-5 border border-limo-border">
                    <Users
                      size={18}
                      strokeWidth={1}
                      className="text-limo-gold flex-shrink-0"
                    />
                    <div>
                      <p className="font-sans text-label text-limo-muted tracking-widest uppercase text-[10px] mb-0.5">
                        Passengers
                      </p>
                      <p className="font-sans text-body-base text-limo-white">
                        Up to {vehicle.capacity}
                      </p>
                    </div>
                  </div>
                )}
                {vehicle.luggage && (
                  <div className="flex items-center gap-3 p-5 border border-limo-border">
                    <Briefcase
                      size={18}
                      strokeWidth={1}
                      className="text-limo-gold flex-shrink-0"
                    />
                    <div>
                      <p className="font-sans text-label text-limo-muted tracking-widest uppercase text-[10px] mb-0.5">
                        Luggage
                      </p>
                      <p className="font-sans text-body-base text-limo-white">
                        {vehicle.luggage}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Amenities */}
              {vehicle.amenities && vehicle.amenities.length > 0 && (
                <div>
                  <h2 className="font-sans text-label text-limo-gold tracking-[0.25em] uppercase mb-6">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {vehicle.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle
                          size={14}
                          strokeWidth={1.5}
                          className="text-limo-gold flex-shrink-0"
                        />
                        <span className="font-sans text-body-small text-limo-white/80">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-limo-gold/30 bg-limo-surface p-8">
                <h3 className="font-serif text-heading-2 text-limo-white font-light mb-2">
                  Book This Vehicle
                </h3>
                <div className="w-10 h-px bg-limo-gold mb-6" />
                <p className="font-sans text-body-small text-limo-muted leading-relaxed mb-8">
                  Reserve the {vehicle.name} for your next journey. Contact us
                  directly or submit a booking request.
                </p>
                <a
                  href={`/#booking?vehicle=${encodeURIComponent(vehicle.name)}`}
                  className="w-full flex items-center justify-center px-6 py-4 bg-limo-gold text-limo-black font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold-light transition-colors duration-300 mb-4"
                >
                  Book Now
                </a>
                <a
                  href="tel:+46101717117"
                  className="w-full flex items-center justify-center px-6 py-4 border border-limo-gold text-limo-gold font-sans text-label tracking-[0.2em] uppercase hover:bg-limo-gold hover:text-limo-black transition-all duration-300"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {vehicle.gallery && vehicle.gallery.length > 0 && (
            <div className="mt-20">
              <h2 className="font-sans text-label text-limo-gold tracking-[0.25em] uppercase mb-8">
                Gallery
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicle.gallery.map((img, i) => {
                  const src = urlFor(img).width(800).height(600).auto("format").url();
                  return (
                    <div
                      key={i}
                      className="relative aspect-[4/3] overflow-hidden bg-limo-border"
                    >
                      <Image
                        src={src}
                        alt={`${vehicle.name} photo ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
