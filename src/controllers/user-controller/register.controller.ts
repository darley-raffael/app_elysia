import { RegisterUserService } from "@/core/users/services/register.service";
import { UserRepository } from "@/external/repositories/users/user.repository";
import Elysia, { t } from "elysia";

const userBodySchema = t.Object({
  name: t.String(),
  email: t.String(),
  password: t.String(),
});

export const registerController = (app: Elysia) => {
  app.post(
    "/users",
    async ({ body }) => {
      const { name, email, password } = body;

      const userRepository = new UserRepository();
      const register = new RegisterUserService(userRepository);
      await register.execute({ name, email, password });
    },
    { body: userBodySchema }
  );

  return app;
};
