import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/posts";
import { userRouter } from "./routers/user";
import { authRouter } from "./routers/auth";
import { mailRouter } from "./routers/toEmail";
import { favouriitRouter  } from "./routers/favourit";
import { comRouter } from "./routers/comment";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  user: userRouter,
  auth:authRouter,
  mail:mailRouter,
  favourit:favouriitRouter,
  comment:comRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
