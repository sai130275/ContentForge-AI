/**
 * Environment variable utilities with type safety
 */

interface EnvConfig {
  appName: string;
  appUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
  enableAnalytics: boolean;
  enableDebug: boolean;
}

/**
 * Get environment variable with fallback
 */
const getEnv = (key: string, fallback: string = ""): string => {
  return import.meta.env[key] || fallback;
};

/**
 * Get boolean environment variable
 */
const getBoolEnv = (key: string, fallback: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  return value === "true" || value === "1";
};

/**
 * Application environment configuration
 */
export const env: EnvConfig = {
  appName: getEnv("VITE_APP_NAME", "ContentForge AI"),
  appUrl: getEnv("VITE_APP_URL", "http://localhost:8080"),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  enableAnalytics: getBoolEnv("VITE_ENABLE_ANALYTICS", false),
  enableDebug: getBoolEnv("VITE_ENABLE_DEBUG", true),
};

/**
 * Validate required environment variables
 */
export const validateEnv = (): void => {
  const required: string[] = [];
  
  const missing = required.filter((key) => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
};
