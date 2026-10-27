export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Must be set before building for production.
// During local development without Sanity, pages fall back to empty data.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "replace-me";
