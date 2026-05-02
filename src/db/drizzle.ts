import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// biome-ignore lint/performance/noNamespaceImport: explain
import * as schema from "./schemas";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Pool | undefined;
};

export const client =
  globalForDb.client ?? new Pool({ connectionString: process.env.DB_URL });

if (process.env.NODE_ENV !== "production") {
  globalForDb.client = client;
}

export const db = drizzle({ client, schema });

export const table = schema;
