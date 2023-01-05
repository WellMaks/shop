import { prisma } from "../../components/prisma";
import { SessionProvider, useSession } from "next-auth/react";

async function getUserInfo(userId: any) {
  // const query = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  //   select: {
  //     username: true,
  //     email: true,
  //     role: true,
  //   },
  // });

  return;
}

export default getUserInfo;
