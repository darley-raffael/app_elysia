import { prisma } from "@/lib/prisma";
import { afterEach, beforeEach } from "bun:test";

beforeEach(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});
