// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createToken } from "@/lib/auth";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({  // Note: lowercase 'user'
      where: {
        email
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({  // Note: lowercase 'user'
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    // Create token
    const token = createToken({
      userId: user.id,
      email: user.email
    });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}