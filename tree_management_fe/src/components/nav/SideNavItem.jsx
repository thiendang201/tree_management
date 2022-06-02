import { NavLink } from "react-router-dom";

const SideNavItem = ({ icon, text, path }) => {
  const active =
    "text-[1.2rem] relative hover:after:opacity-0 group-hover:opacity-100 group-hover:visible group hover:translate-y-[-0.2rem] transition-all duration-300 p-1 block side-nav active";
  const className =
    "text-[1.2rem] relative hover:after:opacity-0 group-hover:opacity-100 group-hover:visible group hover:translate-y-[-0.2rem] transition-all duration-300 p-1 block";
  return (
    <NavLink
      className={({ isActive }) => (isActive ? active : className)}
      to={path}
    >
      {icon}
      <span className="absolute opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible top-[50%] group-hover:shadow-md rounded-[0.6rem] font-semibold z-[-1] bg-white p-[1.2rem] pl-[100%] translate-y-[-50%] left-0 min-w-[18rem]">
        {text}
      </span>
    </NavLink>
  );
};

export default SideNavItem;
