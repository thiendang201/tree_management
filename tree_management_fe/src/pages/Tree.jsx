import { MdAddCircle, MdFilterList, MdDelete } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import Button from "../shared/Button";
import FluentTreeDeciduous20Filled from "../assets/icons/FluentTreeDeciduous20Filled";
import { buttonColor } from "../config";
import { useEffect, useState } from "react";
import TreeCard from "../components/tree/TreeCard";
const Tree = () => {
  const [layout, setLayout] = useState("grid");
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const trees = [
      {
        id: 1,
        name: "Cây sao đen",
        img: "https://caydothi.com.vn/wp-content/uploads/2018/06/cay-sao-den.png",
        location: "Nguyễn Văn Linh, Hải Châu",
      },
      {
        id: 2,
        name: "Cây sao đen",
        img: "https://caydothi.com.vn/wp-content/uploads/2018/06/cay-sao-den.png",
        location: "Nguyễn Văn Linh, Hải Châu",
      },
      {
        id: 3,
        name: "Cây sao đen",
        img: "https://caydothi.com.vn/wp-content/uploads/2018/06/cay-sao-den.png",
        location: "Nguyễn Văn Linh, Hải Châu",
      },
      {
        id: 4,
        name: "Cây sao đen",
        img: "https://caydothi.com.vn/wp-content/uploads/2018/06/cay-sao-den.png",
        location: "Nguyễn Văn Linh, Hải Châu",
      },
      {
        id: 5,
        name: "Cây sao đen",
        img: "https://caydothi.com.vn/wp-content/uploads/2018/06/cay-sao-den.png",
        location: "Nguyễn Văn Linh, Hải Châu",
      },
      {
        id: 6,
        name: "Cây sao đen",
        img: "https://caydothi.com.vn/wp-content/uploads/2018/06/cay-sao-den.png",
        location: "Nguyễn Văn Linh, Hải Châu",
      },
      {
        id: 7,
        name: "Cây sao đen",
        img: "https://caydothi.com.vn/wp-content/uploads/2018/06/cay-sao-den.png",
        location: "Nguyễn Văn Linh, Hải Châu",
      },
      {
        id: 8,
        name: "Cây sao đen",
        img: "https://caydothi.com.vn/wp-content/uploads/2018/06/cay-sao-den.png",
        location: "Nguyễn Văn Linh, Hải Châu",
      },
    ];

    setTrees(trees);
  }, []);

  return (
    <div className="grid grid-cols-[76%_24%] items-stretch">
      <div className="border rounded-[2.5rem] border-border-color m-2">
        <div className="flex justify-between items-center p-1 border-b border-border-color">
          <div className="flex gap-1 items-center">
            <div className="bg-[#F7F8FA] rounded-full p-1">
              <FluentTreeDeciduous20Filled size={24} color={buttonColor} />
            </div>
            <h2 className="text-[1.4rem] font-semibold">Quản lý cây xanh</h2>
          </div>
          <div>
            <Button
              text="Thêm mới"
              icon={<MdAddCircle size={"2rem"} fill="#fff" />}
            />
          </div>
        </div>
        <div className="grid grid-cols-[15%_1fr_15%] p-1 text-[1.2rem] border-b border-border-color">
          <div className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="select_all"
              id="select_all"
              className="appearance-none cursor-pointer h-[1.8rem] w-[1.8rem] border-2 p-[0.2rem] rounded-full checked:bg-primary checked:border-primary bg-clip-content"
            />
            <label
              htmlFor="select_all"
              className="font-medium cursor-pointer text-button-color"
            >
              Chọn tất cả
            </label>
          </div>
          <div className="flex justify-center">
            <div>
              <button className="font-semibold text-button-color hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 border border-r-0 rounded-l-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color pr-[0.6rem]">
                <MdFilterList size={"1.6rem"} fill={buttonColor} /> Bộ lọc
              </button>
            </div>
            <div>
              <button className="font-semibold text-button-color hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 border  flex gap-[0.5rem] items-center p-[0.5rem] border-border-color pr-[0.6rem]">
                <RiSearchLine size={"1.6rem"} fill={buttonColor} /> Tìm kiếm
              </button>
            </div>
            <div>
              <button className="font-semibold text-button-color hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 border-l-0 border rounded-r-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color pr-[0.6rem]">
                <MdDelete size={"1.6rem"} fill={buttonColor} /> Xóa
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 border border-r-0 rounded-l-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color tree-layout active">
              <BsFillGrid3X3GapFill size={"1.4rem"} fill={buttonColor} />
            </button>
            <button className="hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 border rounded-r-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color tree-layout">
              <FaListUl size={"1.4rem"} fill={buttonColor} />
            </button>
          </div>
        </div>
        <div className="bg-[#F7F8FA] rounded-b-[2.5rem]">
          <div className="p-[2.4rem] pb-1">
            {layout === "grid" ? (
              <div className="grid grid-cols-4 gap-1">
                {trees.map((tree) => (
                  <TreeCard key={tree.id} {...tree} />
                ))}
              </div>
            ) : undefined}
          </div>
          <div className="p-1 text-center">
            <button className="hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 border rounded-full bg-white px-[1.6rem] py-[0.8rem] text-[1.2rem] font-semibold">
              Tải thêm
            </button>
          </div>
        </div>
      </div>
      <div className="border-l border-border-color">loai cay</div>
    </div>
  );
};

export default Tree;
