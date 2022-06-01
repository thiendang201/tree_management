import { Link, NavLink } from "react-router-dom";
import MdiLeafCircle from "../assets/icons/MdiLeafCircle";
import FluentTreeDeciduous20Filled from "../assets/icons/FluentTreeDeciduous20Filled";
import FluentTaskListSquareLtr24Filled from "../assets/icons/FluentTaskListSquareLtr24Filled";
import { RiDashboardFill, RiErrorWarningFill } from "react-icons/ri";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdInsertChart } from "react-icons/md";

import { primaryColor } from "../config";
import SideNavItem from "../components/nav/SideNavItem";

const SideNav = () => {
  const navList = [
    {
      text: "Dashboard",
      icon: <RiDashboardFill size={24} color={primaryColor} />,
      path: "dashboard",
    },
    {
      text: "Quản lý cây xanh",
      icon: <FluentTreeDeciduous20Filled size={24} color={primaryColor} />,
      path: "tree",
    },
    {
      text: "Quản lý kế hoạch",
      icon: <FluentTaskListSquareLtr24Filled size={24} color={primaryColor} />,
      path: "plan",
    },
    {
      text: "Sự cố cây xanh",
      icon: <RiErrorWarningFill size={24} color={primaryColor} />,
      path: "problem",
    },
    {
      text: "Thống kê & báo cáo",
      icon: <MdInsertChart size={24} color={primaryColor} />,
      path: "statistic",
    },
    {
      text: "Bản đồ cây xanh",
      icon: <FaMapMarkedAlt size={24} color={primaryColor} />,
      path: "map",
    },
  ];
  return (
    <nav className="w-59 fixed top-0 left-0 bottom-0 border-r border-border-color">
      <div>
        <Link
          className="flex pr-[0.1rem] justify-center h-58 items-center"
          to="/"
        >
          <MdiLeafCircle size={32} color={primaryColor} />
        </Link>
      </div>
      <ul className="flex flex-col items-center gap-[1.8rem] mt-[6rem]">
        {navList.map((nav, index) => (
          <li key={index}>
            <SideNavItem {...nav} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
