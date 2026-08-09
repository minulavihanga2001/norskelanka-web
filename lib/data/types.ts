export type Locale = "en" | "no";
export type Currency = "NOK" | "EUR" | "USD";

export type LocalizedString = {
  en: string;
  no: string;
};

export type Destination = {
  id: string;
  slug: string;
  name: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  image: string;
  trending: boolean;
  /** Percentage coords on the SVG map (0–100) */
  mapX: number;
  mapY: number;
  relatedPackageIds: string[];
};

export type ItineraryDay = {
  day: number;
  title: LocalizedString;
  description: LocalizedString;
};

export type Package = {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  image: string;
  durationDays: number;
  /** Base price per person in NOK */
  priceNok: number;
  inclusions: LocalizedString[];
  itinerary: ItineraryDay[];
  hotelIds: string[];
  destinationIds: string[];
  featured: boolean;
};

export type Hotel = {
  id: string;
  slug: string;
  name: LocalizedString;
  location: LocalizedString;
  summary: LocalizedString;
  image: string;
  discountPercent: number;
  packageIds: string[];
  stars: number;
};

export type BlogKind = "blog" | "notice" | "announcement";

export type BlogPost = {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  /** Markdown body */
  content: LocalizedString;
  image: string;
  kind: BlogKind;
  publishedAt: string;
  author: string;
};

export type FaqItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  order: number;
};

export type Review = {
  id: string;
  name: string;
  country: LocalizedString;
  date: string;
  rating: number;
  text: LocalizedString;
  image: string;
  /** Optional video URL for future use */
  videoUrl?: string;
};

export type Vehicle = {
  id: string;
  name: LocalizedString;
  summary: LocalizedString;
  image: string;
  seats: number;
  year: number;
};

export type Driver = {
  id: string;
  name: string;
  bio: LocalizedString;
  image: string;
  languages: string[];
  yearsExperience: number;
  reviews: {
    id: string;
    author: string;
    text: LocalizedString;
    rating: number;
  }[];
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  packageSlug?: string;
  createdAt: string;
};

export type SiteData = {
  destinations: Destination[];
  packages: Package[];
  hotels: Hotel[];
  blogs: BlogPost[];
  faqs: FaqItem[];
  reviews: Review[];
  vehicles: Vehicle[];
  drivers: Driver[];
  contacts: ContactSubmission[];
};
