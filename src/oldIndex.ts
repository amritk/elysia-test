import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

const app = new Elysia()
  // .use(cors())
  .use(swagger())
  .get("/characters", async () => {
    const resp = await fetch("https://api.sampleapis.com/futurama/characters");

    const characters = await resp.json();
    return characters;
  })
  .get(
    "/characters/:index",
    async ({ params: { index } }) => {
      const resp = await fetch(
        "https://api.sampleapis.com/futurama/characters",
      );
      const characters = await resp.json();
      const character = characters[index];
      return character;
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
    },
  )
  .post("/post-test", ({ body }) => body, {
    detail: {
      summary: "Post test",
      tags: ["random apis"],
      response: t.String({ description: "sample description" }),
    },
    params: t.Object({
      id: t.String(),
    }),
    query: t.Object({
      name: t.String(),
    }),
    body: t.Object({
      username: t.String({ default: "amrit" }),
      password: t.String(),
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
