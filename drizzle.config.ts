import 'dotenv/config';
import type { Config } from 'drizzle-kit';

if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error('TURSO_CONNECTION_URL is not defined');
}

if (!process.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_AUTH_TOKEN is not defined');
}

export default {
  schema: './src/db/migrations/schema.ts',
  out: './src/db/migrations',
  driver: 'turso',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
