import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <main className="w-full pt-10 md:pt-0 md:pl-10">{children}</main>
    </div>
  );
};

export default Layout;
