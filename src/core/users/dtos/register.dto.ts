import type { User } from "@prisma/client";

export interface UserRequestDTO {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface UserResponseDTO {
  user: User;
}
