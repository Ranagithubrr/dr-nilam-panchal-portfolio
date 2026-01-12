import { NextResponse } from "next/server";
import { getCachedSiteContent } from "@/lib/siteContent";

export const GET = async () => {
  const content = await getCachedSiteContent();
  const response = NextResponse.json(content);
  response.headers.set(
    "Cache-Control",
    "public, max-age=60, stale-while-revalidate=300"
  );
  return response;
};
