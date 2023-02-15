import { prisma } from "../../components/prisma";

async function posts(req: any, res: any) {
  const data = JSON.parse(req.body);
  // console.log(data);

  const createPost = await prisma.commands.create({
    data,
  });
  res.json(createPost);
}

export default posts;
