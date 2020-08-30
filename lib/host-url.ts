export const HOST_URL =
  process.env.HOST_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.VERCEL_URL ||
  'http://localhost:3000';
