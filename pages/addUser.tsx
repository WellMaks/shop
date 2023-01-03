import React from "react";
import requireAuth from "../components/RequireAuth";
import { getSession } from "next-auth/react";

function addUser() {
  return <div>addUser</div>;
}

export async function getServerSideProps(context: any) {
  return requireAuth(context, ({ session }: any) => {
    return {
      props: { session },
    };
  });
}

export default addUser;
