import getUserInfo from "./api/getUserInfo";
import { useSession } from "next-auth/react";

const Home = ({ data }) => {
  // const { data: session } = useSession();
  // const session = useSession();
  // console.log(session);
  console.log(data);
  return <>{/* <div>Hello, {params.data.role}</div> */}</>;
};

export async function getStaticProps({ id }) {
  const user = await getUserInfo(1);

  return {
    props: {
      data: user,
    },
  };
}

export default Home;
