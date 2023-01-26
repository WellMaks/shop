import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="">
      <div className="pb-8"></div>
      <div className="container mx-auto ">{children}</div>
    </div>
  );
};

export default Layout;
