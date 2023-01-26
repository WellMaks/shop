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

// interface Token {
//   USER: {
//     username: string;
//     role: string;
//     id: number;
//   };
// }

// interface TokenContextProps {
//   token: Token | null;
//   session: boolean;
// }

// export const TokenContext = createContext<TokenContextProps>({
//   token: null,
//   session: false,
// });

// function MyApp({ Component, pageProps }: any) {
//   const router = useRouter();
//   const showHeader = router.pathname === "/loginPage" ? false : true;
//   const [session, setSession] = useState(false);
//   const [token, setToken] = useState<Token | null>(null);

//   useEffect(() => {
//     if (isTokenExist()) {
//       setSession(true);
//       setToken(jwt.decode(getToken()!) as Token | null);
//     }
//   }, []);

//   return (
//     <>
//       <TokenContext.Provider value={{ token, session }}>
//         {showHeader && <Navbar />}
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </TokenContext.Provider>
//     </>
//   );
// }

// export default MyApp;
