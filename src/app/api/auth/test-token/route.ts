import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";
import jwt from "jsonwebtoken";

export async function GET() {
  console.log("Test endpoint called");

  try {
    // Create a test token
    const testPayload = {
      userId: "test-123",
      email: "test@example.com",
    };

    console.log("Creating token with payload:", testPayload);

    // Ensure JWT_SECRET is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    const token = createToken(testPayload);
    const decodedPayload = jwt.verify(token, jwtSecret);

    return NextResponse.json({
      success: true,
      message: "Token created and verified successfully",
      token,
      decodedPayload,
    });
  } catch (error) {
    console.error("Token test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
