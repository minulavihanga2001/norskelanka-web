import { seedData } from "@/lib/data/seed";
import type {
  BlogPost,
  ContactSubmission,
  Destination,
  Driver,
  FaqItem,
  Hotel,
  Package,
  Review,
  SiteData,
  Vehicle,
} from "@/lib/data/types";

function clone<T>(value: T): T {
  return structuredClone(value);
}

/** In-memory store (resets on server restart). */
let store: SiteData = clone(seedData);

export function getStore(): SiteData {
  return store;
}

export function resetStore() {
  store = clone(seedData);
}

export function listDestinations() {
  return store.destinations;
}

export function getDestination(slug: string) {
  return store.destinations.find((d) => d.slug === slug);
}

export function listPackages() {
  return store.packages;
}

export function getPackage(slug: string) {
  return store.packages.find((p) => p.slug === slug);
}

export function listHotels() {
  return store.hotels;
}

export function getHotel(slug: string) {
  return store.hotels.find((h) => h.slug === slug);
}

export function listBlogs() {
  return [...store.blogs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlog(slug: string) {
  return store.blogs.find((b) => b.slug === slug);
}

export function listFaqs() {
  return [...store.faqs].sort((a, b) => a.order - b.order);
}

export function listReviews() {
  return store.reviews;
}

export function listVehicles() {
  return store.vehicles;
}

export function listDrivers() {
  return store.drivers;
}

export function addContact(submission: Omit<ContactSubmission, "id" | "createdAt">) {
  const entry: ContactSubmission = {
    ...submission,
    id: `c_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  store.contacts.unshift(entry);
  return entry;
}

export function upsertDestination(item: Destination) {
  const i = store.destinations.findIndex((d) => d.id === item.id);
  if (i >= 0) store.destinations[i] = item;
  else store.destinations.push(item);
  return item;
}

export function deleteDestination(id: string) {
  store.destinations = store.destinations.filter((d) => d.id !== id);
}

export function upsertPackage(item: Package) {
  const i = store.packages.findIndex((p) => p.id === item.id);
  if (i >= 0) store.packages[i] = item;
  else store.packages.push(item);
  return item;
}

export function deletePackage(id: string) {
  store.packages = store.packages.filter((p) => p.id !== id);
}

export function upsertHotel(item: Hotel) {
  const i = store.hotels.findIndex((h) => h.id === item.id);
  if (i >= 0) store.hotels[i] = item;
  else store.hotels.push(item);
  return item;
}

export function deleteHotel(id: string) {
  store.hotels = store.hotels.filter((h) => h.id !== id);
}

export function upsertBlog(item: BlogPost) {
  const i = store.blogs.findIndex((b) => b.id === item.id);
  if (i >= 0) store.blogs[i] = item;
  else store.blogs.unshift(item);
  return item;
}

export function deleteBlog(id: string) {
  store.blogs = store.blogs.filter((b) => b.id !== id);
}

export function upsertFaq(item: FaqItem) {
  const i = store.faqs.findIndex((f) => f.id === item.id);
  if (i >= 0) store.faqs[i] = item;
  else store.faqs.push(item);
  return item;
}

export function deleteFaq(id: string) {
  store.faqs = store.faqs.filter((f) => f.id !== id);
}

export function upsertReview(item: Review) {
  const i = store.reviews.findIndex((r) => r.id === item.id);
  if (i >= 0) store.reviews[i] = item;
  else store.reviews.unshift(item);
  return item;
}

export function deleteReview(id: string) {
  store.reviews = store.reviews.filter((r) => r.id !== id);
}

export function upsertVehicle(item: Vehicle) {
  const i = store.vehicles.findIndex((v) => v.id === item.id);
  if (i >= 0) store.vehicles[i] = item;
  else store.vehicles.push(item);
  return item;
}

export function deleteVehicle(id: string) {
  store.vehicles = store.vehicles.filter((v) => v.id !== id);
}

export function upsertDriver(item: Driver) {
  const i = store.drivers.findIndex((d) => d.id === item.id);
  if (i >= 0) store.drivers[i] = item;
  else store.drivers.push(item);
  return item;
}

export function deleteDriver(id: string) {
  store.drivers = store.drivers.filter((d) => d.id !== id);
}
