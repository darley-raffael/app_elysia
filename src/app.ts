import Elysia from "elysia";
import { authentication } from "./controllers/middlewares/auth-jwt.middleware";
import { userRouter } from "./controllers/users/router";

export const app = new Elysia();
app.use(authentication);
app.onError(({ code }) => {
	if (code === "NOT_FOUND") return { message: "Route not found" };
});

app.use(userRouter);
