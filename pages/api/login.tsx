import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../components/prisma";

// const KEY = process.env.JWT_SECRET;
const KEY = "123";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { email, password } = req.body;

  const USER = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (USER?.password != password) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  res.json({
    token: jwt.sign(
      {
        USER,
      },
      KEY!
    ),
  });
}
