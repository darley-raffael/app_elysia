import { app } from "./app";

app.listen(3333, () => {
  console.log(
    `🦊 Elysia is running on ${app.server?.hostname}:${app.server?.port}`
  );
});
