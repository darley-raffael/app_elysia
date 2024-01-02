import type { UseCaseInterface } from "@/core/shared/use-case.interface";
import type { User } from "@prisma/client";
import type { UserRepositoryInterface } from "../repository/user-repository.interface";

interface ProfileRequestDTO {
	userId: string;
}

interface ProfileResponseDTO {
	user: User;
}

export class GetProfileUserService
	implements UseCaseInterface<ProfileRequestDTO, ProfileResponseDTO>
{
	constructor(private userRepository: UserRepositoryInterface) {}
	async execute({ userId }: ProfileRequestDTO): Promise<ProfileResponseDTO> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new Error("User not found");
		}

		return { user };
	}
}
