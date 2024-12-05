// src/lib/validation.ts

export const passwordValidation = {
    minLength: 8,
    requireUppercase: true,
    requireNumber: true,
    requireSpecialChar: true
  };
  
  export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
  
    if (password.length < passwordValidation.minLength) {
      errors.push(`Password must be at least ${passwordValidation.minLength} characters long`);
    }
  
    if (passwordValidation.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
  
    if (passwordValidation.requireNumber && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
  
    if (passwordValidation.requireSpecialChar && !/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  }