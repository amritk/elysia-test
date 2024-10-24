import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

const app = new Elysia()
  // .use(cors())
  .use(swagger())
  .get("/", "success", {
    detail: {
      summary: "Test",
    },
  })
  .get("/things", ["things"], {
    detail: {
      summary: "Things",
      response: {
        stuff: t.String(),
      },
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
