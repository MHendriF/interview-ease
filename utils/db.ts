import * as schema from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const DRIZZLE_DB_URL = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL || "";
const sql = neon(DRIZZLE_DB_URL);
export const db = drizzle(sql, { schema });
