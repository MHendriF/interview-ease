import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { requireEnvVariable } from "@/lib/env";

dotenv.config({ path: ".env.local" });

const DRIZZLE_DB_URL = requireEnvVariable("DRIZZLE_DB_URL");

export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DRIZZLE_DB_URL,
  },
  verbose: true,
  strict: true,
});
