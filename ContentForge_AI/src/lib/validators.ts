/**
 * Input validation utilities
 */

export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  notEmpty: (value: string): boolean => {
    return value.trim().length > 0;
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  isNumber: (value: string): boolean => {
    return !isNaN(Number(value)) && value.trim() !== "";
  },

  isPositiveNumber: (value: string): boolean => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  },
};

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

/**
 * Validate and sanitize form data
 */
export const validateFormData = <T extends Record<string, unknown>>(
  data: T,
  rules: Partial<Record<keyof T, (value: unknown) => boolean>>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;

  for (const [key, validator] of Object.entries(rules)) {
    const value = data[key as keyof T];
    if (!validator(value)) {
      errors[key as keyof T] = `Invalid ${String(key)}`;
      isValid = false;
    }
  }

  return { isValid, errors };
};
