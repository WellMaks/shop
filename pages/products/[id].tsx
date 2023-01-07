import Link from "next/link";
import { prisma } from "../../components/prisma";
import returnPage from "../returnPage";
import getStripe from "../../components/GetStripe";

const ProductPage = (props: { product: any }) => {
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.product),
    });

    if (response.status === 500) return;

    const data = await response.json();
    stripe!.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-12 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="w-full lg:w-6/12 px-4">
        <img
          className="w-full h-64 object-cover"
          src={props.product.image}
          alt={props.product.name}
        />
      </div>
      <div className="w-full lg:w-6/12 px-4 lg:pl-10 lg:py-6">
        <div className="font-bold text-3xl mb-2 text-gray-900">
          {props.product.name}
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {props.product.description}
        </p>
        <div className="mb-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            ${props.product.price}
          </span>
        </div>
        <button>
          <a
            className="inline-block py-3 px-6 bg-blue-500 rounded-full text-sm font-semibold text-white hover:bg-blue-700"
            onClick={handleCheckout}
          >
            Buy Now
          </a>
        </button>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = await returnPage();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(id: any) {
  // const id = parseInt(params.id);

  const product = await prisma.product.findUnique({
    where: {
      product_id: parseInt(id.params.id),
    },
  });

  return {
    props: {
      product: product,
    },
    revalidate: 10,
  };
}

export default ProductPage;
