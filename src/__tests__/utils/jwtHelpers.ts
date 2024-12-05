// utils/jwtHelpers.ts
import jwt from "jsonwebtoken";

export function generateToken(payload: object): string {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string): object | null {
  const secret = process.env.JWT_SECRET!;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
