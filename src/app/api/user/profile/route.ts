import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    // Get the authenticated user's session
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, email } = await request.json();

    // Check if the email is already in use by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: session.userId }, // Ensure it's not the current user
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already in use" },
        { status: 400 }
      );
    }

    // Update the user's profile
    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: { name, email },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
