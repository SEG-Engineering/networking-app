import { NextResponse } from "next/server";
import { createJWT } from "@/lib/auth";

export async function GET() {
  // Mock user data
  const userId = "test-user-id";
  const email = "test@example.com";

  // Generate a token
  const token = createJWT(userId, email);

  return NextResponse.json({ token });
}
