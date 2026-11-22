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
import { urlFor } from "@/sanity/imageUrl";
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
          brandName={settings?.heroBrandName}
          headline={settings?.heroHeadline}
          tagline={settings?.heroTagline}
          mediaType={settings?.heroMediaType}
          imageUrl={settings?.heroImage ? urlFor(settings.heroImage).width(2000).auto("format").url() : undefined}
          videoUrl={settings?.heroVideoUrl}
        />
        <AboutSection />
        <ConciergSection />
        <FleetSection vehicles={vehicles} />
        <ServicesSection services={services} />
        <TestimonialsSection testimonials={testimonials} googleBusinessUrl={settings?.googleBusinessUrl} />
        <BookingSection vehicles={vehicles} />
      </main>
      <Footer />
    </>
  );
}
