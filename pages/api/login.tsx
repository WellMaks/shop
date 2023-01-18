import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "../../components/prisma";
import cookie from "cookie";
// const KEY = "123";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const USER = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (USER?.password != password) {
    res.statusCode = 404;
    res.end("Empty inputs or email and password didn't match");
    return;
  }

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", JSON.stringify(req.body), {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );

  res.statusCode = 200;
  res.json({ success: true });
}

// if (!req.body) {
//   res.statusCode = 404;
//   res.end("Error");
//   return;
// }

// const { email, password } = req.body;

// const USER = await prisma.user.findUnique({
//   where: {
//     email: email,
//   },
// });

// if (USER?.password != password) {
//   res.statusCode = 404;
//   res.end("Error");
//   return;
// }

// res.json({
//   token: jwt.sign(
//     {
//       USER,
//     },
//     KEY
//   ),
// });
