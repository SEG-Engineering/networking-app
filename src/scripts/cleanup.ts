// src/scripts/cleanup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  try {
    // Delete default user and associated contacts if needed
    await prisma.contact.deleteMany({
      where: {
        userId: 'default-user'
      }
    });
    
    await prisma.user.delete({
      where: {
        id: 'default-user'
      }
    });

    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Cleanup error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();