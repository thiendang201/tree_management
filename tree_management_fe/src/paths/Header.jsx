import { TiArrowSortedDown } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { buttonColor } from "../config";
const Header = () => {
  const defaultAvt =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU";
  return (
    <header className="fixed grid-cols-[76%_24%] grid top-0 left-58 right-0 h-59 border-b border-border-color pr-3 bg-white z-10">
      <div className="flex justify-end items-stretch">
        <div className="flex items-center relative pr-3">
          <input
            type="text"
            placeholder="Tìm kiếm cây xanh, kế hoạch, ..."
            className="outline-none border border-border-color rounded-full py-[1rem] pl-[3.4rem] pr[1rem] min-w-[24rem] pr-[1rem] text-[1.1rem] font-medium "
          />
          <RiSearchLine
            className="absolute translate-x-[1rem]"
            size={"2rem"}
            color={buttonColor}
          />
        </div>
      </div>
      <div className="flex justify-end items-stretch">
        <div className="h-58 w-58 p-[0.8rem]">
          <Link
            to="/"
            style={{ backgroundImage: `url(${defaultAvt})` }}
            className="block pt-[100%] bg-center bg-no-repeat bg-cover"
          ></Link>
        </div>
        <div className="flex items-center">
          <button className="py-1 ml-[-0.4rem]">
            <TiArrowSortedDown size={"1.8rem"} fill={"#9FABC6"} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
