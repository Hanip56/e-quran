import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />

      <main className="w-full pt-12 md:pt-0 md:pl-12">{children}</main>
    </div>
  );
};

export default Layout;
