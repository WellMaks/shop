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
  // const a = JSON.parse(props.data);
  // console.log(a.firstName);
  return (
    <>
      <div></div>
    </>
  );
};

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context);

//   var USER;
//   var a: string;
//   if (session) {
//     try {
//       a = session?.user?.name!;

//       USER = await prisma.user.findUnique({
//         where: {
//           id: parseInt(a),
//         },
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   } else {
//     USER = { dick: "shit" };
//   }
//   return {
//     props: {
//       data: JSON.stringify(USER),
//     },
//   };
// }

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        data: null,
      },
    };
  } else {
    var USER;
    var a: string;

    a = session?.user?.name!;

    USER = await prisma.user.findUnique({
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
}

export default Home;
