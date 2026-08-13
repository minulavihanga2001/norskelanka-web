"use server";

import { z } from "zod";
import { addContact } from "@/lib/data/store";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10).max(4000),
  packageSlug: z.string().trim().max(120).optional(),
});

export type ContactState = {
  ok: boolean;
  error?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    packageSlug: formData.get("packageSlug") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: "Please check the form fields and try again." };
  }

  addContact(parsed.data);
  return { ok: true };
}
