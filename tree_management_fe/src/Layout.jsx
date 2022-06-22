import React from "react";
import { Outlet } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Header from "./paths/Header";
import SideNav from "./paths/SideNav";

const Context = React.createContext();
const Layout = () => {
  const addNotification = (title, message = "", type = "success") => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  };

  return (
    <Context.Provider value={{ addNotification }}>
      <ReactNotifications />
      <Header />
      <SideNav />
      <main className="mt-59 ml-59">
        <Outlet />
      </main>
    </Context.Provider>
  );
};

export default Layout;
export { Context };
