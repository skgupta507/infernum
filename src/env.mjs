import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1).optional(),
    DISCORD_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    API_URL: z.string().url(),
    SLACK_WEBHOOK_URL: z.string().url().optional(),
    // Redis (Upstash or any Redis-compatible URL)
    REDIS_URL: z.string().url().optional(),
    REDIS_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
