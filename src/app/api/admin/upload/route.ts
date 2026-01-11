import { NextResponse, type NextRequest } from "next/server";
import { put } from "@vercel/blob";
import { isAdminRequest } from "@/lib/adminAuth";

export const POST = async (request: NextRequest) => {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not configured." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File not found." }, { status: 400 });
  }

  const pathname = `uploads/${Date.now()}-${file.name}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: file.type || "application/octet-stream",
  });

  return NextResponse.json({ url: blob.url });
};
