import { describe, expect, it } from "bun:test";
import { UserRepository } from "@/external/repositories/users/user.repository";
import { AuthenticateUserService } from "./authenticate.service";
import { RegisterUserService } from "./register.service";

const userRepository = new UserRepository();
const sut = new AuthenticateUserService(userRepository);
const register = new RegisterUserService(userRepository);

describe("AuthenticateUserService", () => {
	it("should not be able to authenticate a not existing user", async () => {
		await expect(
			sut.execute({ email: "qjwzA@example.com", password: "123456" }),
		).rejects.toThrow();
	});

	it("should be able to authenticate an existing user", async () => {
		await register.execute({
			name: "John Doe",
			email: "qjwzA@example.com",
			password: "123456",
		});
		const { user } = await sut.execute({
			email: "qjwzA@example.com",
			password: "123456",
		});

		expect(user.email).toBe("qjwzA@example.com");
	});
});
