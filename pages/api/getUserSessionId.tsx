import { useSession } from "next-auth/react";

function getUserSessionId() {
  const { data: session } = useSession();
  return session?.user?.name;
}

export default getUserSessionId;
