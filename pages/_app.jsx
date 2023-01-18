import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import cookie from "cookie";

function MyApp({ Component, pageProps: { ...pageProps }, props }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
