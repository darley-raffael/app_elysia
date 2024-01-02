import type { UseCaseInterface } from "@/core/shared/use-case.interface";
import type { UserRequestDTO, UserResponseDTO } from "../dtos/register.dto";
import type { UserRepositoryInterface } from "../repository/user-repository.interface";

export class RegisterUserService
  implements UseCaseInterface<UserRequestDTO, UserResponseDTO>
{
  constructor(private userRepository: UserRepositoryInterface) {}
  async execute({
    name,
    email,
    password,
  }: UserRequestDTO): Promise<UserResponseDTO> {
    const passwordHashed = Bun.password.hashSync(password);

    const findUserByEmail = await this.userRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new Error("User already exists");
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return {
      user,
    };
  }
}
