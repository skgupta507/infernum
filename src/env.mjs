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
<<<<<<< HEAD

    // OAuth providers — both optional so the app boots with just one
=======
>>>>>>> dd595a859d077d248526844f2914acef2ca871f2
    DISCORD_CLIENT_SECRET: z.string().min(1).optional(),
    DISCORD_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
<<<<<<< HEAD

    // Xyra Stream API
    XYRA_API_KEY: z.string().min(1),
    XYRA_API_URL: z
      .string()
      .url()
      .default("https://api.xyra.stream/v1/dramacool"),

    // Redis (Upstash or standard redis://)
    REDIS_URL: z.string().optional(),
    REDIS_TOKEN: z.string().optional(),

    // Optional
    SLACK_WEBHOOK_URL: z.string().url().optional(),
    API_SECRET_KEY: z.string().optional(),
=======
    API_URL: z.string().url(),
    SLACK_WEBHOOK_URL: z.string().url().optional(),
    // Redis (Upstash or any Redis-compatible URL)
    REDIS_URL: z.string().url().optional(),
    REDIS_TOKEN: z.string().optional(),
>>>>>>> dd595a859d077d248526844f2914acef2ca871f2
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
