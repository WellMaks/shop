import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import PostForm from "../components/PostForm";
import "tailwindcss/tailwind.css";
import { prisma } from "../components/prisma";
import { useAppSelector } from "../store/store";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";

const Home = (props: { products: any }) => {
  const isLoggedIn = useAppSelector((state: any) => state.isLoggedIn);

  const href = isLoggedIn ? "/shop" : "/loginPage";
  // if (props.products !== null) {}

  const products = props.products ? true : false;
  // console.log(products);
  return (
    <>
      <div className=" py-10 px-12">
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link href={href}>
            <PostForm
              post={{
                title: "Add Post",
                image:
                  "https://endlessicons.com/wp-content/uploads/2012/12/add-icon-614x460.png",
              }}
            />
          </Link>

          {products && props.products.length ? (
            props.products.map((product: any) => (
              <PostForm
                post={product.product}
                status={product.status}
                key={product.command_id}
              />
            ))
          ) : (
            <div>No products to show</div>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session: any = getCookie("token");
  console.log(session);
  console.log("session");

  if (!session) {
    return {
      props: {
        products: null,
      },
    };
  } else {
    const token: any = jwt.decode(session);
    const a = token.USER.id;

    const result = await prisma.commands.findMany({
      where: {
        user_id: parseInt(a),
      },
    });

    return {
      props: {
        products: result ? result : null,
      },
    };
  }
}

export default Home;
