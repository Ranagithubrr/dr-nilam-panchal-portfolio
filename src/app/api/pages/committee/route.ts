import { NextResponse } from "next/server";
import { getCachedPageContent } from "@/lib/pageContent";

export const GET = async () => {
  const content = await getCachedPageContent("committee");
  const response = NextResponse.json(content);
  response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  return response;
};
