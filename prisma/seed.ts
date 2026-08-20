import { hashPassword } from '../src/lib/auth/password';
import { db as prisma } from '../src/lib/db';

async function main() {
  console.log('Seeding development database...');

  // 1. Create Price Config
  await prisma.priceConfig.upsert({
    where: { id: 'default-18k' },
    update: {},
    create: {
      id: 'default-18k',
      goldType: '18K',
      buySpreadBp: 150,
      sellSpreadBp: 150,
      feeBp: 50,
      minBuyRial: BigInt(1000000),
      maxBuyRial: BigInt(500000000),
      minSellNg: BigInt(10000000),
      isActive: true,
    }
  });

  // 2. Create Admin User
  const adminPass = hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { mobile: '09000000000' },
    update: {},
    create: {
      mobile: '09000000000',
      passwordHash: adminPass,
      role: 'ADMIN',
      status: 'ACTIVE',
      mobileVerified: true,
      profile: {
        create: {
          firstName: 'Admin',
          lastName: 'Zaravi',
          nationalId: '0000000000'
        }
      },
      cashWallet: { create: { balanceRial: BigInt(0) } },
      goldWallet: { create: { balanceNg: BigInt(0) } }
    }
  });

  // 3. Create Test User with 10M Toman (100,000,000 Rial) and 5 grams gold
  const userPass = hashPassword('user123');
  const user = await prisma.user.upsert({
    where: { mobile: '09111111111' },
    update: {},
    create: {
      mobile: '09111111111',
      passwordHash: userPass,
      role: 'USER',
      status: 'ACTIVE',
      mobileVerified: true,
      profile: {
        create: {
          firstName: 'Test',
          lastName: 'User',
          nationalId: '1111111111'
        }
      },
      cashWallet: { create: { balanceRial: BigInt(100_000_000) } },
      goldWallet: { create: { balanceNg: BigInt(5_000_000_000) } }
    }
  });

  console.log('Seeding finished.');
  console.log('-------------------');
  console.log('Admin: 09000000000 / admin123');
  console.log('User : 09111111111 / user123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
