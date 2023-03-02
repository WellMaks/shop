import Stripe from "stripe";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(req: any, res: any) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;
  const decoded: any = jwt.decode(token);
  const id = decoded.USER.id;
  if (req.method === "POST") {
    try {
      const product = req.body;
      const params = {
        metadata: {
          data: JSON.stringify(req.body),
          user_data: id,
        },
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_options: [
          { shipping_rate: "shr_1MN7SeFk9yMeM54NU4T5FrtY" },
          { shipping_rate: "shr_1MN7TnFk9yMeM54NzxbRpszl" },
        ],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: product.name,
                images: [product.image],
              },
              unit_amount: product.price * 100,
            },
            quantity: 1,
          },
        ],

        success_url: `${req.headers.origin}/next?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      } as any;
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
