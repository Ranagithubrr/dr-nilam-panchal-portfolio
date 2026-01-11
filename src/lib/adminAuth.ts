import crypto from "crypto";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

const getSecret = () =>
  process.env.ADMIN_SESSION_SECRET || "dev-admin-secret";

const sign = (value: string) => {
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(value);
  return hmac.digest("hex");
};

export const createSessionValue = (username: string) => {
  const issuedAt = Date.now();
  const payload = `${username}.${issuedAt}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
};

export const verifySessionValue = (value: string | undefined) => {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 3) return false;
  const [username, issuedAt, signature] = parts;
  const payload = `${username}.${issuedAt}`;
  if (sign(payload) !== signature) return false;
  const ageSeconds = (Date.now() - Number(issuedAt)) / 1000;
  return ageSeconds < SESSION_MAX_AGE;
};

export const isAdminRequest = (request: NextRequest) => {
  const value = request.cookies.get(COOKIE_NAME)?.value;
  return verifySessionValue(value);
};

export const getSessionCookieName = () => COOKIE_NAME;
export const getSessionMaxAge = () => SESSION_MAX_AGE;
