import { NextResponse } from "next/server";
import { getPageContent } from "@/lib/pageContent";

export const GET = async () => {
  const content = await getPageContent("conference");
  const response = NextResponse.json(content);
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
};
