import 'dotenv/config';
import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const flag = process.argv[2];

  if (flag !== '--confirm') {
    console.log('⚠️  Ten skrypt usunie WSZYSTKICH klientów z bazy.');
    console.log('   Aby potwierdzić, uruchom:');
    console.log('');
    console.log('   npx tsx prisma/clear-clients.ts --confirm');
    console.log('');
    process.exit(0);
  }

  console.log('Usuwanie klientów...\n');

  const clientCount = await prisma.client.count();
  const deleted = await prisma.client.deleteMany();

  console.log(`  Client:  usunięto ${deleted.count} / ${clientCount}`);
  console.log('\nGotowe.');
}

main()
  .catch((e) => {
    console.error('Błąd:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
