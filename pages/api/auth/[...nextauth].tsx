import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../components/prisma";
import { NextAuthOptions } from "next-auth";
import { useEffect, useState } from "react";

type UserData = {
  name: string;
};

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const USER = await prisma.user.findUnique({
            where: {
              email: credentials?.username,
            },
          });

          if (USER) {
            if (credentials?.password == USER.password) {
              return {
                name: USER?.id,
                email: USER?.email,
                image: USER?.avatar,
              } as any;
            }
            return null;
          }
        } catch (e: any) {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
