import { Link } from "react-router-dom";
import MdiLeafCircle from "../assets/icons/MdiLeafCircle";
import { primaryColor } from "../config";

const SideNav = () => {
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
    </nav>
  );
};

export default SideNav;
