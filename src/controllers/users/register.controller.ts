import { RegisterUserService } from "@/core/users/services/register.service";
import { UserRepository } from "@/external/repositories/users/user.repository";
import Elysia, { error, t } from "elysia";

const userBodySchema = t.Object({
	name: t.String(),
	email: t.String(),
	password: t.String(),
});

export const registerController = (app: Elysia) => {
	app.post(
		"/",
		async ({ body }) => {
			const { name, email, password } = body;

			const userRepository = new UserRepository();
			const register = new RegisterUserService(userRepository);
			try {
				const { user } = await register.execute({ name, email, password });
				return { message: "User created", id: user.id };
			} catch (err) {
				return error(400, err);
			}
		},
		{ body: userBodySchema },
	);

	return app;
};
