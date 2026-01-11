import { NextResponse } from "next/server";
import {
  createSessionValue,
  getSessionCookieName,
  getSessionMaxAge,
} from "@/lib/adminAuth";

const ADMIN_USERNAME = "admin123";
const ADMIN_PASSWORD = "Admin@123";

export const POST = async (request: Request) => {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.username !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.username !== ADMIN_USERNAME || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getSessionCookieName(), createSessionValue(body.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: getSessionMaxAge(),
    path: "/",
  });

  return response;
};
