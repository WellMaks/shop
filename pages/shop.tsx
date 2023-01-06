import { prisma } from "../components/prisma";
import Link from "next/link";
import PostForm from "../components/PostForm";

function shop(props: { data: any }) {
  return (
    <>
      <div className=" py-10 px-12">
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {props.data?.map((product: any) => (
            <Link
              href={"/products/" + product.product_id}
              key={product.product_id}
            >
              <PostForm post={product} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const products = await prisma.product.findMany();

  return {
    props: {
      data: products,
    },
  };
}

export default shop;
