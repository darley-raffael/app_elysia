import type { RepositoryInterface } from "@/core/shared/repository.interface";
import { type User } from "@prisma/client";

export type UserCreateInput = Omit<User, "id">;

export interface UserRepositoryInterface
  extends RepositoryInterface<UserCreateInput, User> {
  findByEmail(email: string): Promise<User | null>;
}
