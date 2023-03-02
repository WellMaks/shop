import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store/store";

function MyApp({ Component, pageProps }: any) {
  const router = useRouter();
  const showHeader = router.pathname === "/loginPage" ? false : true;
  return (
    <>
      <Provider store={store}>
        {showHeader && <Navbar />}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
