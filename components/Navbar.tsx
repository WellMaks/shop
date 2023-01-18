import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "cookie";
import { useEffect, useState } from "react";

export async function getInitialProps(context: any) {
  const cookies = cookie.parse(context.req.headers.cookie)
    ? cookie.parse(context.req.headers.cookie)
    : null;
  return { props: { cookies } };
}

const Navbar = (props: any) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  console.log(props);
  useEffect(() => {
    if (props.token !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  let data, role: string;
  let admin = false;

  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full ">
      <Link href="/" legacyBehavior className="mb-2 sm:mb-0">
        <a className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
          Home, {isLoggedIn == false ? "not logged" : " logged"}
        </a>
      </Link>
      <div>
        {isLoggedIn ? (
          <a className="text-lg no-underline text-grey-darkest ml-2">
            Welcome, {props.token}!
          </a>
        ) : (
          ""
        )}
        {isLoggedIn ? (
          admin ? (
            <Link href="/adminPage" legacyBehavior>
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-4">
                Admin Panel
              </a>
            </Link>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <Link href="/" legacyBehavior>
            <a
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 "
              onClick={() => {
                setIsLoggedIn(false);
                fetch("/api/logout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({}),
                });
              }}
            >
              Log out
            </a>
          </Link>
        ) : (
          <>
            <Link href="/loginPage" legacyBehavior>
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-4">
                LogIn
              </a>
            </Link>
            <Link href="/addUser" legacyBehavior>
              <a className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-4">
                Register
              </a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
