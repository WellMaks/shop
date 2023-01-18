import { getSession } from "next-auth/react";

async function requireAuth(context: any, cb: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return cb({ session });
}

export default requireAuth;
