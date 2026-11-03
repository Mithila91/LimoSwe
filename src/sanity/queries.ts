import { groq } from "next-sanity";

export const allVehiclesQuery = groq`
  *[_type == "vehicle"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    vehicleClass,
    eco,
    capacity,
    luggage,
    shortDescription,
    heroImage,
    amenities,
  }
`;

export const vehicleBySlugQuery = groq`
  *[_type == "vehicle" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    vehicleClass,
    eco,
    capacity,
    luggage,
    shortDescription,
    description,
    heroImage,
    gallery,
    amenities,
  }
`;

export const allVehicleSlugsQuery = groq`
  *[_type == "vehicle"] { "slug": slug.current }
`;

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    icon,
    description,
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    author,
    body,
    rating,
    source,
    date,
    reviewUrl,
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    phone,
    whatsapp,
    email,
    heroHeadline,
    heroTagline,
    heroMediaType,
    heroImage,
    "heroVideoUrl": select(
      heroMediaType == "video" => heroVideo.asset->url,
      heroMediaType == "videoUrl" => heroVideoUrl,
    ),
    googleBusinessUrl,
    metaTitle,
    metaDescription,
    logo,
  }
`;
