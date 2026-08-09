"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  ADMIN_TOKEN,
  getAdminPassword,
  isAdminAuthenticated,
} from "@/lib/auth";
import {
  deleteBlog,
  deleteDestination,
  deleteDriver,
  deleteFaq,
  deleteHotel,
  deletePackage,
  deleteReview,
  deleteVehicle,
  upsertBlog,
  upsertDestination,
  upsertDriver,
  upsertFaq,
  upsertHotel,
  upsertPackage,
  upsertReview,
  upsertVehicle,
} from "@/lib/data/store";
import type {
  BlogKind,
  BlogPost,
  Destination,
  Driver,
  FaqItem,
  Hotel,
  Package,
  Review,
  Vehicle,
} from "@/lib/data/types";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function adminLogin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password !== getAdminPassword()) {
    redirect("/admin/login?error=1");
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, ADMIN_TOKEN, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function adminLogout() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveBlogAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || `b_${Date.now()}`);
  const titleEn = String(formData.get("titleEn") ?? "");
  const titleNo = String(formData.get("titleNo") ?? titleEn);
  const slug = String(formData.get("slug") || slugify(titleEn));
  const post: BlogPost = {
    id,
    slug,
    title: { en: titleEn, no: titleNo },
    excerpt: {
      en: String(formData.get("excerptEn") ?? ""),
      no: String(formData.get("excerptNo") ?? ""),
    },
    content: {
      en: String(formData.get("contentEn") ?? ""),
      no: String(formData.get("contentNo") ?? ""),
    },
    image: String(formData.get("image") ?? ""),
    kind: (String(formData.get("kind") ?? "blog") as BlogKind) || "blog",
    publishedAt: String(formData.get("publishedAt") || new Date().toISOString().slice(0, 10)),
    author: String(formData.get("author") || "Norske Lanka Travels"),
  };
  upsertBlog(post);
  revalidateAll();
  redirect("/admin/blogs");
}

export async function deleteBlogAction(formData: FormData) {
  await requireAdmin();
  deleteBlog(String(formData.get("id")));
  revalidateAll();
}

export async function saveFaqAction(formData: FormData) {
  await requireAdmin();
  const item: FaqItem = {
    id: String(formData.get("id") || `f_${Date.now()}`),
    question: {
      en: String(formData.get("questionEn") ?? ""),
      no: String(formData.get("questionNo") ?? ""),
    },
    answer: {
      en: String(formData.get("answerEn") ?? ""),
      no: String(formData.get("answerNo") ?? ""),
    },
    order: Number(formData.get("order") ?? 99),
  };
  upsertFaq(item);
  revalidateAll();
  redirect("/admin/faqs");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdmin();
  deleteFaq(String(formData.get("id")));
  revalidateAll();
}

export async function saveDestinationAction(formData: FormData) {
  await requireAdmin();
  const nameEn = String(formData.get("nameEn") ?? "");
  const item: Destination = {
    id: String(formData.get("id") || `d_${Date.now()}`),
    slug: String(formData.get("slug") || slugify(nameEn)),
    name: { en: nameEn, no: String(formData.get("nameNo") ?? nameEn) },
    summary: {
      en: String(formData.get("summaryEn") ?? ""),
      no: String(formData.get("summaryNo") ?? ""),
    },
    description: {
      en: String(formData.get("descriptionEn") ?? ""),
      no: String(formData.get("descriptionNo") ?? ""),
    },
    image: String(formData.get("image") ?? ""),
    trending: formData.get("trending") === "on",
    mapX: Number(formData.get("mapX") ?? 50),
    mapY: Number(formData.get("mapY") ?? 50),
    relatedPackageIds: String(formData.get("relatedPackageIds") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };
  upsertDestination(item);
  revalidateAll();
  redirect("/admin/destinations");
}

export async function deleteDestinationAction(formData: FormData) {
  await requireAdmin();
  deleteDestination(String(formData.get("id")));
  revalidateAll();
}

export async function savePackageAction(formData: FormData) {
  await requireAdmin();
  const titleEn = String(formData.get("titleEn") ?? "");
  const item: Package = {
    id: String(formData.get("id") || `p_${Date.now()}`),
    slug: String(formData.get("slug") || slugify(titleEn)),
    title: { en: titleEn, no: String(formData.get("titleNo") ?? titleEn) },
    summary: {
      en: String(formData.get("summaryEn") ?? ""),
      no: String(formData.get("summaryNo") ?? ""),
    },
    description: {
      en: String(formData.get("descriptionEn") ?? ""),
      no: String(formData.get("descriptionNo") ?? ""),
    },
    image: String(formData.get("image") ?? ""),
    durationDays: Number(formData.get("durationDays") ?? 7),
    priceNok: Number(formData.get("priceNok") ?? 0),
    inclusions: [
      {
        en: String(formData.get("inclusionEn") ?? "Private vehicle & driver"),
        no: String(formData.get("inclusionNo") ?? "Privat bil og sjåfør"),
      },
    ],
    itinerary: [
      {
        day: 1,
        title: {
          en: String(formData.get("day1TitleEn") ?? "Arrival"),
          no: String(formData.get("day1TitleNo") ?? "Ankomst"),
        },
        description: {
          en: String(formData.get("day1DescEn") ?? ""),
          no: String(formData.get("day1DescNo") ?? ""),
        },
      },
    ],
    hotelIds: String(formData.get("hotelIds") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    destinationIds: String(formData.get("destinationIds") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
  };
  upsertPackage(item);
  revalidateAll();
  redirect("/admin/packages");
}

export async function deletePackageAction(formData: FormData) {
  await requireAdmin();
  deletePackage(String(formData.get("id")));
  revalidateAll();
}

export async function saveHotelAction(formData: FormData) {
  await requireAdmin();
  const nameEn = String(formData.get("nameEn") ?? "");
  const item: Hotel = {
    id: String(formData.get("id") || `h_${Date.now()}`),
    slug: String(formData.get("slug") || slugify(nameEn)),
    name: { en: nameEn, no: String(formData.get("nameNo") ?? nameEn) },
    location: {
      en: String(formData.get("locationEn") ?? ""),
      no: String(formData.get("locationNo") ?? ""),
    },
    summary: {
      en: String(formData.get("summaryEn") ?? ""),
      no: String(formData.get("summaryNo") ?? ""),
    },
    image: String(formData.get("image") ?? ""),
    discountPercent: Number(formData.get("discountPercent") ?? 0),
    packageIds: String(formData.get("packageIds") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    stars: Number(formData.get("stars") ?? 4),
  };
  upsertHotel(item);
  revalidateAll();
  redirect("/admin/hotels");
}

export async function deleteHotelAction(formData: FormData) {
  await requireAdmin();
  deleteHotel(String(formData.get("id")));
  revalidateAll();
}

export async function saveReviewAction(formData: FormData) {
  await requireAdmin();
  const item: Review = {
    id: String(formData.get("id") || `r_${Date.now()}`),
    name: String(formData.get("name") ?? ""),
    country: {
      en: String(formData.get("countryEn") ?? "Norway"),
      no: String(formData.get("countryNo") ?? "Norge"),
    },
    date: String(formData.get("date") || new Date().toISOString().slice(0, 10)),
    rating: Number(formData.get("rating") ?? 5),
    text: {
      en: String(formData.get("textEn") ?? ""),
      no: String(formData.get("textNo") ?? ""),
    },
    image: String(formData.get("image") ?? ""),
    videoUrl: String(formData.get("videoUrl") ?? "") || undefined,
  };
  upsertReview(item);
  revalidateAll();
  redirect("/admin/reviews");
}

export async function deleteReviewAction(formData: FormData) {
  await requireAdmin();
  deleteReview(String(formData.get("id")));
  revalidateAll();
}

export async function saveVehicleAction(formData: FormData) {
  await requireAdmin();
  const nameEn = String(formData.get("nameEn") ?? "");
  const item: Vehicle = {
    id: String(formData.get("id") || `v_${Date.now()}`),
    name: { en: nameEn, no: String(formData.get("nameNo") ?? nameEn) },
    summary: {
      en: String(formData.get("summaryEn") ?? ""),
      no: String(formData.get("summaryNo") ?? ""),
    },
    image: String(formData.get("image") ?? ""),
    seats: Number(formData.get("seats") ?? 3),
    year: Number(formData.get("year") ?? 2024),
  };
  upsertVehicle(item);
  revalidateAll();
  redirect("/admin/transport");
}

export async function deleteVehicleAction(formData: FormData) {
  await requireAdmin();
  deleteVehicle(String(formData.get("id")));
  revalidateAll();
}

export async function saveDriverAction(formData: FormData) {
  await requireAdmin();
  const item: Driver = {
    id: String(formData.get("id") || `dr_${Date.now()}`),
    name: String(formData.get("name") ?? ""),
    bio: {
      en: String(formData.get("bioEn") ?? ""),
      no: String(formData.get("bioNo") ?? ""),
    },
    image: String(formData.get("image") ?? ""),
    languages: String(formData.get("languages") ?? "English")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    yearsExperience: Number(formData.get("yearsExperience") ?? 1),
    reviews: [],
  };
  upsertDriver(item);
  revalidateAll();
  redirect("/admin/transport");
}

export async function deleteDriverAction(formData: FormData) {
  await requireAdmin();
  deleteDriver(String(formData.get("id")));
  revalidateAll();
}
