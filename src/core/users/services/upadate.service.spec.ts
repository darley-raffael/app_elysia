import { UserRepository } from "@/external/repositories/users/user.repository";
import { describe, expect, it } from "bun:test";
import { RegisterUserService } from "./register.service";
import { UpdateUserService } from "./update.service";

const userRepository = new UserRepository();
const sut = new UpdateUserService(userRepository); // sut = system under test
const register = new RegisterUserService(userRepository);

describe("UpdateUserService", () => {
  it("should be able to update a user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    };

    const { user } = await register.execute({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });

    const updatedUser = {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "123456",
    };

    const { user: updated } = await sut.execute({
      id: user.id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      new_password: updatedUser.password,
    });

    expect(updated.name).toBe(updatedUser.name);
  });
});
