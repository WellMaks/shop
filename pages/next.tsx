import { useEffect, useState } from "react";
import Link from "next/link";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export default function Success({ order }: { order: any }) {
  async function saveProduct() {
    const data = JSON.parse(localStorage.getItem("suckDickDeepShit")!);

    const response = await fetch("/api/saveProduct", {
      method: "POST",
      // body: JSON.stringify(req.body),
      body: JSON.stringify({
        user_id: data.id,
        product: JSON.parse(order.metadata.data),
        status: "Package preparing",
      }),
    });

    return await response.json();
  }

  return (
    <div>
      Success!
      <br />
      <Link href="/">
        <b>
          <button onClick={saveProduct}>Go back to home</button>
        </b>
      </Link>
    </div>
  );
}

export async function getServerSideProps(params: any) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id
  );

  return { props: { order } };
}
