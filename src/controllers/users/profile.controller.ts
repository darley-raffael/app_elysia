import { GetProfileUserService } from "@/core/users/services/get-profile.service";
import { UserRepository } from "@/external/repositories/users/user.repository";
import type Elysia from "elysia";
import { error, t } from "elysia";

const userIdSchema = t.Object({ id: t.String({ format: "uuid" }) });

export const profileController = (app: Elysia) => {
	app.get(
		"/profile/:id",
		async ({ params }) => {
			const userRepository = new UserRepository();
			const getProfile = new GetProfileUserService(userRepository);

			try {
				const { user } = await getProfile.execute({ userId: params.id });
				return {
					profile: {
						id: user.id,
						name: user.name,
						email: user.email,
					},
				};
			} catch (err) {
				return error(400, { err });
			}
		},
		{ params: userIdSchema },
	);

	return app;
};
