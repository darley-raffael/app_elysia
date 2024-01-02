import type { UseCaseInterface } from "@/core/shared/use-case.interface";
import type { User } from "@prisma/client";
import type { UserRepositoryInterface } from "../repository/user-repository.interface";

type Page = number;
interface GetAllResponseDTO {
	users: User[];
}

export class GetAllUsersService
	implements UseCaseInterface<Page, GetAllResponseDTO>
{
	constructor(private userRepository: UserRepositoryInterface) {}

	async execute(page: Page): Promise<GetAllResponseDTO> {
		const users = await this.userRepository.findAll(page);

		if (!users) return { users: [] };

		return { users };
	}
}
