import { NextAuthOptions, getServerSession, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  { prisma }  from "./prismadb"



declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin: Boolean;
        };
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            // clientId: process.env.GOOGLE_ID as string,
            // clientSecret: process.env.GOOGLE_SECRET as string,
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ]
}


export const getAuthSession = () => getServerSession(authOptions);
