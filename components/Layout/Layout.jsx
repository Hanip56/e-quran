import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <main className="w-full pl-11">{children}</main>
    </div>
  );
};

export default Layout;
