import { useAppSelector } from "../store/store";

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const data = useAppSelector((state) => state.isLoggedIn);
    if (!data) {
      return <p>Loading...</p>;
    }
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
