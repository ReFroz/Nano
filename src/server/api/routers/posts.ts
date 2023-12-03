import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";



export const postsRouter = createTRPCRouter({
    
    getAll:publicProcedure
    .query(({ctx})=>{
        return ctx.db.post.findMany({
            select:{
                id:true,
                title:true,
                price:true,
                popularity:true,
                property:true,
                imgs:{
                    select:{
                        altTitle:true,
                    }
                },
                brands:{
                    select:{
                        title:true,
                        img:true,
                    }
                }
            },
            take:8

        })
    }),
    get1post:publicProcedure
    .input(z.number())
    .query(({ctx,input})=>{
        return ctx.db.post.findMany({
            select:{
                id:true,
                title:true,
                price:true,
                property:true,
                imgs:{
                    select:{
                        altTitle:true,
                    }
                },
                brands:{
                    select:{
                        title:true,
                        img:true,
                    }
                }
            },
                where:{
                    id:input
                }

        })
    }),

    getCategory:publicProcedure
    .query(({ctx})=>{
        return ctx.db.category.findMany(
           {select:{
            id:true,
            title:true,
            img:true
           }}
        )
    }),
    get6Category:publicProcedure
    .query(({ctx})=>{
        return ctx.db.category.findMany(
           {select:{
            id:true,
            title:true,
            img:true
           },take:6}
        )
    }),
    getFilterPosts:publicProcedure
    .input(z.string())
    .query(({ctx,input})=>{
        return ctx.db.post.findMany({
            select:{
                popularity:true,
                id:true,
                title:true,
                price:true,
                imgs:{
                    select:{
                        altTitle:true,
                    }
                },
                brands:{
                    select:{
                        title:true,
                        img:true
                    }
                },
                categories:{
                    select:{
                        title:true,
                    }
                }
            },
            where:{
                        categories:{
                            some:{
                                title: input.length <1? {not:undefined} : input
                            }
                        }
            },
            
            
        })
    })
})