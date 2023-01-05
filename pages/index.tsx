import getUserInfo from "./api/getUserInfo";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { prisma } from "../components/prisma";
import { getSession } from "next-auth/react";

const Home = (props: { data: any }) => {
  const [userInfo, setUserInfo] = useState<any>(props.data);
  const session = useSession();

  useEffect(() => {
    localStorage.setItem("suckDickDeepShit", userInfo);
  }, [userInfo]);

  return (
    <>
      <div></div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  var a: string = session ? session?.user?.name! : "0";

  const USER = await prisma.user.findUnique({
    where: {
      id: parseInt(a),
    },
  });
  return {
    props: {
      data: JSON.stringify(USER),
    },
  };
}

export default Home;
