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
      async authorize(credentials, req) {
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
              };
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

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "text",
//           placeholder: "Email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Password",
//         },
//       },

//       async authorize(credentials) {

//         // const USER = await prisma.user.findUnique({
//         //   where: {
//         //     email: credentials.username,
//         //   },
//         // });

//         // if (USER) {
//         //   if (credentials.password == USER.password) {
//         //     return {
//         //       id: USER.id,
//         //       name: USER.id,
//         //       email: USER.email,
//         //       image: USER.avatar,
//         //     };
//         //   }
//         // }
//         // return null;
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: ({ token, user }) => {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     session: ({ session, token }) => {
//       if (token) {
//         session.id = token.id;
//       }
//       return session;
//     },
//   },
//   secret: "test",
//   jwt: {
//     secret: "test",
//     encryption: true,
//   },
// });

export default NextAuth(authOptions);
