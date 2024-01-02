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
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<null> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
