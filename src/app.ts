import Elysia from "elysia";
import { registerController } from "./controllers/user-controller/register.controller";

export const app = new Elysia();

app.use(registerController);
