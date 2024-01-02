import { describe, expect, it } from "bun:test";
import { UserRepository } from "@/external/repositories/users/user.repository";
import { DeleteUserService } from "./delete.service";
import { RegisterUserService } from "./register.service";

const userRepository = new UserRepository();
const del = new DeleteUserService(userRepository);
const register = new RegisterUserService(userRepository);

describe("DeleteUserService", () => {
	it("should be able to delete user", async () => {
		const newUser = {
			name: "John Doe",
			email: "john@example.com",
			password: "123456",
		};

		const { user } = await register.execute(newUser);

		expect(await del.execute(user.id)).toEqual(void 0);
	});
});
