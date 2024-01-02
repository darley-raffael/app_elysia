import type { UseCaseInterface } from "@/core/shared/use-case.interface";
import type { UserRepositoryInterface } from "../repository/user-repository.interface";

export class DeleteUserService implements UseCaseInterface<string, void> {
	constructor(private userRepository: UserRepositoryInterface) {}
	async execute(input: string): Promise<void> {
		await this.userRepository.delete(input);
	}
}
