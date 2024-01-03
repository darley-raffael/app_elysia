import { PrismaClient } from "@prisma/client";
import { spawnSync } from "bun";

export const prisma = new PrismaClient();

if (Bun.env.NODE_ENV === "test")
	//adicionar um console e uma cor verde na mensagem
	console.log(
		"\x1b[32m%s\x1b[0m",
		`Prisma connected on ${Bun.env.DATABASE_URL}`,
	);
spawnSync({ cmd: ["bunx", "prisma", "migrate", "dev"], stdout: "inherit" });
