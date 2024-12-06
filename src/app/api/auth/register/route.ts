import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createToken } from "@/lib/auth";
import bcrypt from "bcrypt";
import { validateEmail, validatePassword } from "@/lib/validation";

export async function POST(request: Request) {
  console.log("Registration endpoint called");

  try {
    const { email, password, name } = await request.json();
    console.log("Received data:", { email, password, name });

    // Validate email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid password",
          details: passwordValidation.errors,
        },
        { status: 400 }
      );
    }

    // Debugging the query
    console.log("Checking if user exists with email:", email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    console.log("Creating new user...");
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    console.log("User created:", user);

    // Create token
    const token = createToken({
      userId: user.id,
      email: user.email,
    });

    console.log("Token created:", token);

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
