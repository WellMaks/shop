import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    console.log(req.body);

    try {
      const product = JSON.parse(req.body);
      const params = {
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
              adjustable_quantity: {
                enable: false,
              },
              quantity: 1,
            },
          },
        ],

        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
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
