import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { logoutUser } from "../store/action-creators";
import { useAppDispatch, useAppSelector } from "../store/store";
import jwt from "jsonwebtoken";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state: any) => state.isLoggedIn);
  const getToken = useAppSelector((state: any) => state.token);
  const token: any = jwt.decode(getToken);

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
