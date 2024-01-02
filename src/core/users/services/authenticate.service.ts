import type { UseCaseInterface } from "@/core/shared/use-case.interface";
import type { User } from "@prisma/client";
import type { UserRepositoryInterface } from "../repository/user-repository.interface";

interface AuthenticateRequestDTO {
	email: string;
	password: string;
}

interface AuthenticateResponseDTO {
	user: User;
}

export class AuthenticateUserService
	implements UseCaseInterface<AuthenticateRequestDTO, AuthenticateResponseDTO>
{
	constructor(private userRepository: UserRepositoryInterface) {}
	async execute(
		input: AuthenticateRequestDTO,
	): Promise<AuthenticateResponseDTO> {
		const user = await this.userRepository.findByEmail(input.email);

		if (!user) {
			throw new Error("User not found");
		}

		const passwordVerified = Bun.password.verifySync(
			input.password,
			user.password,
		);

		if (!passwordVerified) {
			throw new Error("Password incorrect");
		}

		return { user };
	}
}
