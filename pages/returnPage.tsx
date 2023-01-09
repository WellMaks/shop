import { prisma } from "../components/prisma";

async function returnPage() {
  const posts = await prisma.product.findMany({
    select: {
      product_id: true,
    },
  });
  // return posts;
  return posts.map((post: any) => {
    return {
      params: {
        id: post.product_id.toString(),
      },
    };
  });
}

export default returnPage;
