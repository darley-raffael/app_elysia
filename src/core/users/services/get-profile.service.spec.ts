import { describe, expect, it } from "bun:test";
import { UserRepository } from "@/external/repositories/users/user.repository";
import { GetProfileUserService } from "./get-profile.service";
import { RegisterUserService } from "./register.service";

const userRepository = new UserRepository();
const getProfile = new GetProfileUserService(userRepository);
const register = new RegisterUserService(userRepository);

describe("GetProfileUserService", () => {
	it("should be able to get profile", async () => {
		const newUser = {
			name: "John Doe",
			email: "john@example.com",
			password: "123456",
		};

		const { user } = await register.execute(newUser);

		const { user: profile } = await getProfile.execute({ userId: user.id });

		expect(profile.name).toBe(newUser.name);
	});
});
