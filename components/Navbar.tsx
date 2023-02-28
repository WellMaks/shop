import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { logoutUser } from "../store/action-creators";
import { useAppDispatch, useAppSelector } from "../store/store";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";

const Navbar = () => {
  const dispatch = useAppDispatch();
  // const isLoggedIn = useAppSelector((state: any) => state.isLoggedIn);
  const getToken = useAppSelector((state: any) => state.token);
  const token: any = jwt.decode(getToken);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (getCookie("token")) {
      setIsLoggedIn(true);
    }
  });

  try {
    const cookie: any = getCookie("token");
    const decoded = jwt.verify(cookie, "123");
  } catch (err) {
    console.log(err);
    console.log("Invalid token");
    dispatch(logoutUser());
  }

  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full ">
      <Link href="/" legacyBehavior className="mb-2 sm:mb-0">
        <a className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
          Home
        </a>
      </Link>
      <div>
        {isLoggedIn ? (
          <a className="text-lg no-underline text-grey-darkest ml-2">
            Welcome, {token?.USER.username}!
          </a>
        ) : (
          ""
        )}
        {isLoggedIn ? (
          token?.USER.role == "ADMIN" ? (
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
                dispatch(logoutUser());
                setIsLoggedIn(false);
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

// export async function getServerSideProps(params: any) {
//   const session: any = getCookie("token", params);
//   if(session){
//     const token: any = jwt.decode(session);
//     const id = token.USER.id;

//     return { props: { isLoggedIn: true } };
//   }else{
//     return { props: { isLoggedIn: false } };
//   }

// }

export default Navbar;
