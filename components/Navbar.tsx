import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);
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
            TypeError: Cannot read properties of null (reading 'useContext')
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// {session ? (
//   <ul>
//     <li>
//       <a>Welcome, {session.user.name}!</a>
//       <Link href="/" legacyBehavior>
//         <a
//           onClick={() => {
//             signOut();
//           }}
//         >
//           Log out
//         </a>
//       </Link>
//     </li>
//   </ul>
// ) : (
//   <ul>
//     <li>
//       <Link href="/api/auth/signin" legacyBehavior>
//         <a
//           onClick={() => {
//             signIn();
//           }}
//         >
//           Log In
//         </a>
//       </Link>
//     </li>
//     {/* <li>
//       <Link>Register</Link>
//     </li> */}
//   </ul>
// )}
