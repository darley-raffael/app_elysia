import Elysia from "elysia";
import { profileController } from "./profile.controller";
import { registerController } from "./register.controller";

export const userRouter = new Elysia();

userRouter.group("users", (app) => {
	app.use(registerController);
	app.use(profileController);
	return app;
});
