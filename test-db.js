import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error querying users table:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
