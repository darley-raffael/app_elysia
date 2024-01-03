import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const authentication = new Elysia()
	.use(
		jwt({
			name: "jwt",
			secret: Bun.env.SECRET_JWT || "secret-jwt",
		}),
	)
	.use(cookie())
	.state({
		jwt: jwt,
		cookie: cookie,
	});
