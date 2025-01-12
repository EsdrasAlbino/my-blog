import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { prismaInstance as prisma, prismaInstance } from "@/lib/prismaClient";

import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please fill in all fields");
        }

        const user = await prismaInstance.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
  }, 

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};
