import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { prisma } from "../../components/prisma";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Payment intent");

  let event = req.body;
  // console.log(event);

  if (process.env.STRIPE_WEBHOOK_SECRET!) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    const buf = await buffer(req);
    console.log(signature);
    try {
      event = stripe.webhooks.constructEvent(
        buf,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400);
    }
  }

  // console.log(event.type);
  // console.log(event.data.object.metadata);
  // console.log(event.data.object);

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      console.log("Success!");
      // console.log("token: " + id);
      const data: any = {
        user_id: JSON.parse(event.data.object.metadata.user_data),
        product: JSON.parse(event.data.object.metadata.data),
        status: "Package preparing",
      };
      const createPost = await prisma.commands.create({
        data,
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
