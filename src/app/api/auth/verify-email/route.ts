// src/app/api/auth/verify-email/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Update user with verification token
    await prisma.user.update({
      where: { email },
      data: {
        verificationToken,
        isVerified: false
      }
    });

    // Send verification email
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email/${verificationToken}`;
    await sendEmail({
      to: email,
      subject: 'Verify your email',
      html: `
        <h1>Verify your email address</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${verifyUrl}">Verify Email</a>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}

// src/app/api/auth/verify-email/[token]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    const user = await prisma.user.findFirst({
      where: { verificationToken: token }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null
      }
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`);
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}