import { z } from "zod";
import { hash } from "argon2";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const UserRegisterInputSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  password: z.string().min(4),
});

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(UserRegisterInputSchema)
    .mutation(async ({ ctx, input }) => {
      const passwordHash = await hash(input.password);

      try {
        const user = await ctx.db.user.create({
          data: {
            name: input.name,
            image:"",
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            passwordHash,
          },
        });

        return user.id;
      } catch {
        return null;
      }
    }),
});