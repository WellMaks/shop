import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import PostForm from "../components/PostForm";
import "tailwindcss/tailwind.css";
import { prisma } from "../components/prisma";
import { useAppSelector } from "../store/store";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";

const Home = (props: { products: any }) => {
  const href = "/";
  console.log(props.products);
  if (props.products) {
    const products = JSON.parse(props.products);
    return (
      <>
        <div className=" py-10 px-12">
          <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Link
              href={href}
              // onClick={() => {
              //   if (session.status == "unauthenticated") {
              //     signIn();
              //   } else {
              //   }
              // }}
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
          <Link href={href} onClick={() => {}}>
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

// export async function getServerSideProps(context: any) {
//   // const session = token;
//   const session = getCookie("token") ? true : false;
//   const token: any = getCookie("token") ? {} : "";
//   if (!session) {
//     return {
//       props: {
//         data: null,
//       },
//     };
//   } else {
//     var a: any;
//     a = token?.USER.id;

//     const result = await prisma.commands.findMany({
//       where: {
//         user_id: parseInt(a),
//       },
//     });

//     return {
//       props: {
//         products: result ? JSON.stringify(result) : null,
//       },
//     };
//   }
// }

export default Home;
