import type { UserRequestDTO } from "@/core/users/dtos/register.dto";
import type { UserRepositoryInterface } from "@/core/users/repository/user-repository.interface";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

export class UserRepository implements UserRepositoryInterface {
	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
	async create(item: UserRequestDTO): Promise<User> {
		const userCreated = await prisma.user.create({
			data: {
				name: item.name,
				email: item.email,
				password: item.password,
			},
		});

		return userCreated;
	}
	async update(item: UserRequestDTO): Promise<User> {
		const userUpdated = await prisma.user.update({
			where: {
				id: item.id,
			},
			data: {
				name: item.name,
				email: item.email,
				password: item.password,
			},
		});

		return userUpdated;
	}
	async delete(id: string): Promise<null> {
		await prisma.user.delete({
			where: {
				id,
			},
		});
		return null;
	}
	async findById(id: string): Promise<User> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}
	async findAll(page: number): Promise<User[]> {
		const size = Bun.env.SIZE_LIMIT_PAGE || 100;
		// no find all deve ser possível paginar os dados retornados - 100 items por página
		const users = await prisma.user.findMany({
			take: size,
			skip: (page - 1) * 100,
		});

		return users;
	}
}
