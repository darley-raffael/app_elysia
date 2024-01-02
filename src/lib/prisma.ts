import { PrismaClient } from "@prisma/client";
import { spawnSync } from "bun";

export const prisma = new PrismaClient();

if (Bun.env.NODE_ENV === "test")
  spawnSync({ cmd: ["bunx", "prisma", "migrate", "dev"] });
