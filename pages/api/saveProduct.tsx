import { prisma } from "../../components/prisma";

async function posts(req: any, res: any) {
  const data = JSON.parse(req.body);

  const createPost = await prisma.commands.create({
    data: {
      // Set the product data here
      // user_id: data.name,
      // product: product,
      user_id: 1,
      product: { a: "1" },
    },
  });
  res.json(createPost);
}

export default posts;
