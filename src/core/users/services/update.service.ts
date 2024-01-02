import type { UseCaseInterface } from "@/core/shared/use-case.interface";
import type { User } from "@prisma/client";
import type { UserRequestDTO } from "../dtos/register.dto";
import type { UserRepositoryInterface } from "../repository/user-repository.interface";

interface UserUpdateRequestDTO extends Partial<UserRequestDTO> {
	id: string;
	new_password?: string;
}

interface UserUpdateResponseDTO {
	user: User;
}

export class UpdateUserService
	implements UseCaseInterface<UserUpdateRequestDTO, UserUpdateResponseDTO>
{
	constructor(private userRepository: UserRepositoryInterface) {}
	async execute(input: UserUpdateRequestDTO): Promise<UserUpdateResponseDTO> {
		const { id, name, email, password, new_password } = input;

		const user = await this.userRepository.findById(id);
		if (!user) throw new Error("User not found");

		if (email) {
			const findUserByEmail = await this.userRepository.findByEmail(email);
			if (findUserByEmail) throw new Error("User already exists");
		}

		user.email = email ?? user.email;
		user.name = name ?? user.name;

		if (password && !new_password) {
			throw new Error("New password is required");
		}

		if (password && new_password) {
			const passwordVerified = Bun.password.verifySync(password, user.password);
			if (!passwordVerified) throw new Error("Password incorrect");
			user.password = Bun.password.hashSync(new_password);
		}

		const userUpdated = await this.userRepository.update(user);

		return { user: userUpdated };
	}
}
