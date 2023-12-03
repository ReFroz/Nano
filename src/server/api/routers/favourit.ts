import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { contextProps } from "@trpc/react-query/shared";

export const favouriitRouter = createTRPCRouter({
    getLike:publicProcedure
    .query(({ctx})=>{
        return ctx.db.favourit.findMany(
            {
                select:{
                    postsID:true,
                    posts:{select:{
                        id:true,
                        title:true,
                        price:true,
                        imgs:{
                            select:{
                                altTitle:true,
                                title:true
                            },
                        },
                        property:true,                     
                    },
                },
                
            },
            where:{
                user:{id:Number(ctx.session?.user.id)}
            }
        }
        )
    }),
    addLike:protectedProcedure
    .input(z.number())
    .mutation(async ({ctx,input})=>{
        try{
            const Likes=await ctx.db.favourit.findFirst({where:{
                postsID:input,
                userID:Number(ctx.session?.user.id)
            }})
            if (Likes)
            {
                const Like= await ctx.db.favourit.deleteMany({
                    
                    where:{
                        userID:Number(ctx.session?.user.id),
                        postsID:input,
                    }
                    
                })
                return null
            }
            else
            {
                const Like= await ctx.db.favourit.create({
                    data:{
                        userID:Number(ctx.session?.user.id),
                        postsID:input 
                    }
                })
                return Like
            }
             


            
        } catch{
            return null
        }
    })  ,
    
})