import { Outlet } from "react-router-dom";
import Header from "./paths/Header";
import SideNav from "./paths/SideNav";

const Layout = () => {
  return (
    <>
      <Header />
      <SideNav />
      <main className="mt-59 ml-59">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
