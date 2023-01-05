import requireAuth from "../components/RequireAuth";

function adminPage() {
  return <div>adminPage</div>;
}

export async function getServerSideProps(context: any) {
  return requireAuth(context, ({ session }: any) => {
    return {
      props: { session },
    };
  });
}

export default adminPage;
