import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  User as NextAuthUser
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import  GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      email: string;
      name: string;
      // ...other properties
      // role: UserRole;
    };
  }
  
  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

interface User {
  id: number;
  email: string;
  name: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
    name: string;
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    
  },

  callbacks: {
    session({ session, token }) {
      session.user = { id: token.id, email: token.email, name: token.name };
      return session;
    },
    // @ts-ignore 
    jwt: ({ token, user }) => {
      user = user as NextAuthUser;
      if (user) {
        return { id: user.id, email: user.email, name: user.name };
      }
      return token;
    },
  },
  pages :{
    signIn:'/login'
  }
  ,
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
       
        const user = await db.user.findFirst({
          where: { email: credentials?.email },
        });
        if (!user) {
          return null;
        }
       
      
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};