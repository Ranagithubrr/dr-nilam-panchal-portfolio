import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";

export const GET = async (request: NextRequest) => {
  return NextResponse.json({ authenticated: isAdminRequest(request) });
};
