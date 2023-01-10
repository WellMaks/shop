import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { prisma } from "../components/prisma";
import { getSession } from "next-auth/react";
import Link from "next/link";
import PostForm from "../components/PostForm";
import { signIn } from "next-auth/react";
import "tailwindcss/tailwind.css";

const Home = (props: { data: any; products: any }) => {
  const [userInfo, setUserInfo] = useState<any>(props.data);

  const session = useSession();
  const href = session.status == "unauthenticated" ? "/" : "shop";

  useEffect(() => {
    localStorage.setItem("suckDickDeepShit", userInfo);
  }, [userInfo]);
  if (props.products) {
    const products = JSON.parse(props.products);
    return (
      <>
        <div className=" py-10 px-12">
          <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Link
              href={href}
              onClick={() => {
                if (session.status == "unauthenticated") {
                  signIn();
                } else {
                }
              }}
            >
              <PostForm
                post={{
                  title: "Add Post",
                  image:
                    "https://endlessicons.com/wp-content/uploads/2012/12/add-icon-614x460.png",
                }}
              />
            </Link>

            {products.map((product: any) => (
              <PostForm
                post={product.product}
                status={product.status}
                key={product.command_id}
              />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    <>
      <div className=" py-10 px-12">
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            href={href}
            onClick={() => {
              if (session.status == "unauthenticated") {
                signIn();
              } else {
              }
            }}
          >
            <PostForm
              post={{
                title: "Add Post",
                image:
                  "https://endlessicons.com/wp-content/uploads/2012/12/add-icon-614x460.png",
              }}
            />
          </Link>
        </div>
      </div>
    </>;
  }
};

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

    const result = await prisma.commands.findMany({
      where: {
        user_id: parseInt(a),
      },
    });

    return {
      props: {
        data: JSON.stringify(USER),
        products: result ? JSON.stringify(result) : null,
      },
    };
  }
}

export default Home;
