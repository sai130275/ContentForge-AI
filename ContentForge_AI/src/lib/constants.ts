/**
 * Application-wide constants
 */

export const APP_NAME = "ContentForge AI";
export const APP_DESCRIPTION = "Transform your content creation workflow with intelligent AI-powered tools";

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  INTEGRATIONS: "/integrations",
} as const;

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com",
  DOCS: "https://docs.contentforge.ai",
  SUPPORT: "https://support.contentforge.ai",
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
