/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

export const HOST_URL =
  process.env.HOST_URL || process.env.VERCEL_URL || 'http://localhost:3000';
