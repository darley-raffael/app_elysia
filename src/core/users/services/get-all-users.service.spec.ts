import { describe, expect, it } from "bun:test";
import { UserRepository } from "@/external/repositories/users/user.repository";
import { GetAllUsersService } from "./get-all-users.service";
import { RegisterUserService } from "./register.service";

const userRepository = new UserRepository();
const sut = new GetAllUsersService(userRepository);
const register = new RegisterUserService(userRepository);

describe("GetAllUsersService", () => {
	it("should be able to get all users", async () => {
		const newUser = {
			name: "John Doe",
			email: "john@example.com",
			password: "123456",
		};

		await register.execute(newUser);

		const { users } = await sut.execute(1);

		expect(users.length).toBe(1);
	});
});
