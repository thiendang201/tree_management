import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { MdAddCircle, MdFilterList, MdDelete } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import Button from "../../shared/Button";
import FluentTreeDeciduous20Filled from "../../assets/icons/FluentTreeDeciduous20Filled";
import { buttonColor, primaryColor } from "../../config";
import TreeCard from "../../components/tree/TreeCard";
import TypeOfTree from "../../components/tree/TypeOfTree";
import DeleteDialog from "../../shared/DeleteDialog";
import { useNavigate } from "react-router-dom";

const Tree = () => {
  const [layout, setLayout] = useState("grid");
  const [trees, setTrees] = useState([]);
  const [typesOfTrees, setTypesOfTrees] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [treeIds, setTreeIds] = useState([]);
  const [openTreeDeleteDialog, setOpenTreeDeleteDialog] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const colors = ["#8B75D7", "#26A0FC", "#26E7A6", "#FBB938", "#FD8080"];
    const typesOfTrees = [
      {
        id: 1,
        name: "Cây họ bàng",
        treeQty: 235,
      },
      {
        id: 2,
        name: "Cây lá rộng",
        treeQty: 397,
      },
      {
        id: 3,
        name: "Cây lá nhỏ",
        treeQty: 176,
      },
      {
        id: 4,
        name: "Cây họ cau",
        treeQty: 80,
      },
      {
        id: 5,
        name: "Cây họ cọ",

        treeQty: 112,
      },
      {
        id: 6,
        name: "Cây họ A",

        treeQty: 32,
      },
      {
        id: 7,
        name: "Cây họ B",

        treeQty: 11,
      },
    ];
    typesOfTrees.sort(({ treeQty: a }, { treeQty: b }) => b - a);
    const total = typesOfTrees.reduce(
      (sum, { treeQty }) => (sum += treeQty),
      0
    );
    const list = typesOfTrees.map((type) => {
      return {
        ...type,
        ratio: (type.treeQty / total) * 100,
        color: colors.shift() || "#A8A8A8",
      };
    });
    const other = list.slice(5).reduce(
      (pre, cur) => {
        return {
          ...pre,
          treeQty: pre.treeQty + cur.treeQty,
          ratio: pre.ratio + cur.ratio,
        };
      },
      { name: "Khác", treeQty: 0, ratio: 0, color: "#A8A8A8" }
    );
    const chartData = list.slice(0, 5);
    chartData.push(other);
    setChartData(chartData);
    setTypesOfTrees(list);
  }, []);

  const selectAll = (e) => {
    const checked = e.target.checked;
    if (checked) {
      const IdList = trees.map(({ id }) => id);
      setTreeIds(IdList);
    } else {
      setTreeIds([]);
    }
    setOpenTreeDeleteDialog(false);
  };

  const handleCheck = (id) => () => {
    const checked = treeIds.includes(id);
    if (checked) {
      setTreeIds(treeIds.filter((treeId) => treeId !== id));
    } else {
      setTreeIds([...treeIds, id]);
    }
    setOpenTreeDeleteDialog(false);
  };

  const handleTreeDelete = () => {
    setOpenTreeDeleteDialog(!openTreeDeleteDialog);
  };

  const toAddTreePage = () => {
    navigate("add");
  };

  return (
    <div className="grid grid-cols-[76%_24%] min-h-content">
      <div className="m-2">
        <div className="flex justify-between items-center p-1 border rounded-t-[2.5rem] border-border-color">
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
              onClick={toAddTreePage}
            />
          </div>
        </div>
        <div className="grid grid-cols-[15%_1fr_15%] p-1 text-[1.2rem] border border-t-0 border-border-color sticky top-[5.9rem] bg-white z-10">
          <div className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              name="select_all"
              id="select_all"
              onChange={selectAll}
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
              <button className="font-semibold text-button-color translate-y-hover border border-r-0 rounded-l-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color pr-[0.6rem]">
                <MdFilterList size={"1.6rem"} fill={buttonColor} /> Bộ lọc
              </button>
            </div>
            <div>
              <button className="font-semibold text-button-color translate-y-hover border  flex gap-[0.5rem] items-center p-[0.5rem] border-border-color pr-[0.6rem]">
                <RiSearchLine size={"1.6rem"} fill={buttonColor} /> Tìm kiếm
              </button>
            </div>
            <div className="relative">
              <button
                onClick={handleTreeDelete}
                className="font-semibold text-button-color translate-y-hover border-l-0 border rounded-r-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color pr-[0.6rem]"
              >
                <MdDelete size={"1.6rem"} fill={buttonColor} /> Xóa
              </button>
              <CSSTransition
                in={openTreeDeleteDialog && treeIds.length > 0}
                timeout={300}
                classNames="dialog-slide-up"
                unmountOnExit
              >
                <DeleteDialog
                  message={`Bạn có muốn xóa ${treeIds.length} cây đã chọn không?`}
                  handleClose={handleTreeDelete}
                />
              </CSSTransition>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="translate-y-hover border border-r-0 rounded-l-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color tree-layout active">
              <BsFillGrid3X3GapFill size={"1.4rem"} fill={buttonColor} />
            </button>
            <button className="translate-y-hover border rounded-r-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color tree-layout">
              <FaListUl size={"1.4rem"} fill={buttonColor} />
            </button>
          </div>
        </div>
        <div className="bg-[#F7F8FA] border border-t-0 border-border-color rounded-b-[2.5rem]">
          <div className="p-[2.4rem] pb-1">
            {layout === "grid" ? (
              <div className="grid grid-cols-4 gap-1">
                {trees.map((tree) => (
                  <TreeCard
                    key={tree.id}
                    {...tree}
                    checked={treeIds.includes(tree.id)}
                    handleCheck={handleCheck}
                  />
                ))}
              </div>
            ) : undefined}
          </div>
          <div className="p-1 text-center">
            <button className="translate-y-hover border rounded-full bg-white px-[1.6rem] py-[0.8rem] text-[1.2rem] font-semibold">
              Tải thêm
            </button>
          </div>
        </div>
      </div>
      <div className="border-l border-border-color px-2 pt-[3.4rem]">
        <div className="flex justify-between items-center">
          <h2 className="text-[1.4rem] font-semibold">Loại cây</h2>
          <div>
            <Button
              type="outline"
              text="Thêm mới"
              icon={<MdAddCircle size={"2rem"} fill={primaryColor} />}
            />
          </div>
        </div>
        <div className="h-[5rem] mt-[1.2rem]">
          {chartData.map(({ name, treeQty, ratio, color }, index) => (
            <div
              key={index}
              style={{ width: ratio + "%", backgroundColor: color }}
              className="h-[100%] inline-block relative group first:rounded-l-[0.4rem] last:rounded-r-[0.4rem]"
            >
              <div className="group-hover:top-[50%] group-hover:opacity-100 group-hover:visible p-[0.6rem] shadow-md absolute bg-white min-w-max right-0 rounded-[0.4rem] top-[55%] transition-all duration-300 opacity-0 invisible">
                <strong>{name}</strong>
                <br />
                <span className="">{treeQty} cây</span>
              </div>
            </div>
          ))}
        </div>
        <table className="mt-[2.4rem] w-[100%]">
          <thead className="border-t border-b border-border-color">
            <tr>
              <th className="py-1 text-[1.2rem]">ID</th>
              <th className="py-1 text-[1.2rem] text-left">Tên loại cây</th>
              <th className="py-1 text-[1.2rem]">Tỉ lệ</th>
              <th className="py-1 text-[1.2rem]">#</th>
            </tr>
          </thead>
          <tbody>
            {typesOfTrees.map((type) => (
              <TypeOfTree key={type.id} {...type} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tree;
