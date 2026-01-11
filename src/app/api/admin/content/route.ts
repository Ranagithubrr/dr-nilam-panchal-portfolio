import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/siteContent";

export const GET = async () => {
  const content = await getSiteContent();
  return NextResponse.json(content);
};

export const PUT = async (request: NextRequest) => {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const saved = await saveSiteContent(body);
    return NextResponse.json(saved);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
