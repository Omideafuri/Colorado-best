import fs from 'node:fs';
import path from 'node:path';
import { db } from '../src/lib/db';

async function applyConstraints() {
  console.log('Applying database financial constraints...');
  const sqlPath = path.join(process.cwd(), 'prisma', 'constraints.sql');
  
  if (!fs.existsSync(sqlPath)) {
    console.error('constraints.sql not found');
    process.exit(1);
  }

  const sqlStatements = fs.readFileSync(sqlPath, 'utf8')
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);

  for (const stmt of sqlStatements) {
    try {
      await db.$executeRawUnsafe(stmt);
      console.log(`Executed: ${stmt.substring(0, 50)}...`);
    } catch (error: unknown) {
      const err = error as Record<string, unknown>;
      // 42710 is the Postgres code for duplicate_object (constraint already exists)
      if (err.code === '42710' || (typeof err.message === 'string' && err.message.includes('42710'))) {
        console.log(`Constraint already exists (skipped): ${stmt.substring(0, 50)}...`);
      } else {
        console.error(`Failed to execute: ${stmt}`);
        console.error(error);
      }
    }
  }
  
  console.log('Finished applying constraints.');
}

applyConstraints()
  .catch(console.error)
  .finally(() => db.$disconnect());
