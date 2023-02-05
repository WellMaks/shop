import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "../store/store";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export default function Success({ order, id }: { order: any; id: any }) {
  async function saveProduct() {
    const response = await fetch("/api/saveProduct", {
      method: "POST",
      body: JSON.stringify({
        user_id: id,
        product: JSON.parse(order.metadata.data),
        status: "Package preparing",
      }),
    });

    return await response.json();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success") && localStorage.getItem("saved") != "yes") {
      saveProduct();
      localStorage.setItem("saved", "yes");
    }
  });

  return (
    <div>
      Success!
      <br />
      <Link href="/">
        <b>
          <button>Go back to home</button>
        </b>
      </Link>
    </div>
  );
}

export async function getServerSideProps(params: any) {
  const session: any = getCookie("token", params);
  const token: any = jwt.decode(session);
  const id = token.USER.id;

  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id
  );

  return { props: { order, id } };
}
