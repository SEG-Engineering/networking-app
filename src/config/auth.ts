// src/config/auth.ts
export const authConfig = {
    jwt: {
      secret: process.env.JWT_SECRET!,
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    bcrypt: {
      saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'),
    },
    cookie: {
      name: process.env.COOKIE_NAME || 'auth-token',
      maxAge: parseInt(process.env.COOKIE_MAX_AGE || '604800'),
      secure: process.env.NODE_ENV === 'production',
    },
  };
  
  // Validate required environment variables
  const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL'];
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });