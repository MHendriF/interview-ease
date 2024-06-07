import { defineConfig } from "drizzle-kit";

const dbUrl: string = process.env.NEXT_PUBLIC_CLERK_DRIZZLE_DB_URL || "";
export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
});
