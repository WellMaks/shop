import { prisma } from "../../components/prisma";
import { SessionProvider, useSession } from "next-auth/react";
import getUserSessionId from "./getUserSessionId";

async function getUserInfo(userId: any) {
  const query = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      email: true,
      role: true,
    },
  });

  return query;
}

export default getUserInfo;
