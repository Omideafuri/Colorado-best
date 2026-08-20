import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

import * as pgConnectionString from 'pg-connection-string';
import 'dotenv/config';

// Initialize the Prisma Pg adapter
const connectionString = process.env.DATABASE_URL!;
const config = pgConnectionString.parse(connectionString);
if (config.password) {
  config.password = String(config.password);
}
const pool = new Pool(config as any);
const adapter = new PrismaPg(pool);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
