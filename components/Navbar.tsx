import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  let data, role: string;
  let admin = false;
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    try {
      data = JSON.parse(localStorage.getItem("suckDickDeepShit")!);
      role = data.role;
    } catch (e) {
      role = "DEFAULT";
    }

    if (role == "ADMIN") {
      admin = true;
    }
  }
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full ">
      <Link href="/" legacyBehavior className="mb-2 sm:mb-0">
        <a className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
          Home
        </a>
      </Link>
      <div>
        {session ? (
          <a className="text-lg no-underline text-grey-darkest ml-2">
            Welcome, {session?.user?.name}!
          </a>
        ) : (
          ""
        )}
        {session ? (
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
        {session ? (
          <Link href="/" legacyBehavior>
            <a
              className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 "
              onClick={() => {
                signOut();
              }}
            >
              Log out
            </a>
          </Link>
        ) : (
          <>
            <Link href="/api/auth/signin" legacyBehavior>
              <a
                className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 pr-4"
                onClick={() => {
                  signIn();
                }}
              >
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
