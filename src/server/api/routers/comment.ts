import { z } from "zod";
import { hash } from "argon2";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const comRouter = createTRPCRouter({ 
    getCom:publicProcedure
    .input(z.number())
    .query(({ctx,input})=>{
        return ctx.db.comment.findMany({
            where:{
                postID:input
            },
            select:{
                postID:true,
                id:true,
                text:true,
                user:{
                    select:{
                        name:true,
                        lastName:true,
                    }
                }
            }
        })
    }),
    addCom:protectedProcedure
    .input(z.object({
        postID:z.number(),
        text:z.string()
}))
    .mutation(async ({ctx,input})=>{
        const comment= await ctx.db.comment.create({
            data:{
                userId:Number(ctx.session?.user.id),
                text:input.text,
                postID:input.postID    
            }
        })
        return comment
    })
    
})