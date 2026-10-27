// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export type VehicleClass =
  | "luxury"
  | "executive"
  | "van-suv"
  | "business"
  | "stretch"
  | "vip-bus";

export interface Vehicle {
  _id: string;
  name: string;
  slug: string;
  vehicleClass: VehicleClass;
  eco: boolean;
  capacity?: number;
  luggage?: string;
  shortDescription?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any[];
  heroImage: SanityImageSource;
  gallery?: SanityImageSource[];
  amenities?: string[];
}

export interface Service {
  _id: string;
  title: string;
  icon?: string;
  description?: string;
}

export interface Testimonial {
  _id: string;
  author: string;
  body: string;
  rating: number;
  source: "google" | "direct";
  date?: string;
}

export interface SiteSettings {
  siteName: string;
  phone: string;
  whatsapp: string;
  email: string;
  heroHeadline: string;
  heroTagline: string;
  heroImage?: SanityImageSource;
  metaTitle?: string;
  metaDescription?: string;
  logo?: SanityImageSource;
}

export const VEHICLE_CLASS_LABELS: Record<VehicleClass, string> = {
  luxury: "Luxury Class",
  executive: "Executive Class",
  "van-suv": "Luxury Van & SUV",
  business: "Business Class",
  stretch: "Stretch Limousine",
  "vip-bus": "VIP Bus",
};
