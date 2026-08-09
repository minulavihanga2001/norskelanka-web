import { cookies } from "next/headers";

const ADMIN_COOKIE = "nl_admin_session";
const ADMIN_TOKEN = "norske-lanka-admin-ok";

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin123";
}

export { ADMIN_COOKIE, ADMIN_TOKEN };
