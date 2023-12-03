import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { hash, verify } from "argon2";

export const ChangePasswordSchema = z.object({
  password: z.string().min(4),
  newPassword: z.string().min(4),
});

export const UpdateUserInfoSchema = z.object({
  name: z.string().min(4).optional(),
  lastName: z.string().min(4).optional(),
  email: z.string().min(4).email().optional(),
  phone: z.string().min(4).optional(),
  address: z.string().min(4).optional(),
});

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
      },
    });
  }),
  changePassword: protectedProcedure
    .input(ChangePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUniqueOrThrow({
        where: { id: ctx.session.user.id },
        select: { passwordHash: true },
      });

      const isOldCorrect = await verify(user.passwordHash, input.password);

      if (!isOldCorrect) {
        return null;
      }

      const newPasswordHash = await hash(input.newPassword);

      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { passwordHash: newPasswordHash },
      });

      return true;
    }),
  updateInfo: protectedProcedure
    .input(UpdateUserInfoSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
      return true;
    }),
});