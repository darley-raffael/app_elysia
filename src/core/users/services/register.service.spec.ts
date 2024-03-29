import { UserRepository } from "@/external/repositories/users/user.repository";
import { password } from "bun";
import { describe, expect, it } from "bun:test";
import { RegisterUserService } from "./register.service";

const userRepository = new UserRepository();
const sut = new RegisterUserService(userRepository);

describe("RegisterUserService", () => {
  it("should be able to register a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "qjwzA@example.com",
      password: "123456",
    };

    const { user } = await sut.execute(newUser);

    expect(user.name).toBe(newUser.name);
  });

  it("should not be able to register a user with an existing email", async () => {
    const newUser = {
      name: "John Doe",
      email: "qjwzA@example.com",
      password: "123456",
    };

    await sut.execute(newUser);

    expect(sut.execute(newUser)).rejects.toThrow();
  });

  it("should hashed the password upon registration", async () => {
    const newUser = {
      name: "John Doe",
      email: "qjwzA@example.com",
      password: "123456",
    };

    const { user } = await sut.execute(newUser);

    const verifyPassword = password.verifySync(newUser.password, user.password);

    expect(verifyPassword).toBe(true);
  });
});
