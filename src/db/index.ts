import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL is not set. EarnerSkins requires its own dedicated Neon database.",
  );
}

const sql = neon(url);
export const db = drizzle(sql, { schema });
export * from "./schema";
