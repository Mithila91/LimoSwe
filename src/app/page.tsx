import { client } from "@/sanity/client";
import {
  allVehiclesQuery,
  allServicesQuery,
  featuredTestimonialsQuery,
  siteSettingsQuery,
} from "@/sanity/queries";
import type { Vehicle, Service, Testimonial, SiteSettings } from "@/types";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ConciergSection from "@/components/ConciergSection";
import FleetSection from "@/components/FleetSection";
import ServicesSection from "@/components/ServicesSection";
import BookingSection from "@/components/BookingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function HomePage() {
  const [vehicles, services, testimonials, settings] = await Promise.all([
    client.fetch<Vehicle[]>(allVehiclesQuery).catch(() => []),
    client.fetch<Service[]>(allServicesQuery).catch(() => []),
    client.fetch<Testimonial[]>(featuredTestimonialsQuery).catch(() => []),
    client.fetch<SiteSettings>(siteSettingsQuery).catch(() => null),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          headline={settings?.heroHeadline}
          tagline={settings?.heroTagline}
        />
        <AboutSection />
        <ConciergSection />
        <FleetSection vehicles={vehicles} />
        <ServicesSection services={services} />
        <TestimonialsSection testimonials={testimonials} />
        <BookingSection vehicles={vehicles} />
      </main>
      <Footer />
    </>
  );
}
