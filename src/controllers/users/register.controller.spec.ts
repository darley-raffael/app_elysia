import { describe, expect, it } from "bun:test";
import { app } from "@/app";

const baseUrl = "http://localhost:3333/";

describe("Register Controller", async () => {
	it("should be able to register a new user", async () => {
		const newUser = {
			name: "John Doe",
			email: "qjwzA@example.com",
			password: "123456",
		};

		const response = await app.handle(
			new Request(`${baseUrl}users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			}),
		);

		expect(response.status).toBe(200);
	});
});
