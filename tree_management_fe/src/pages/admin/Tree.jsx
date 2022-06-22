import React, { useEffect, useState } from "react";
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
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";
import {
  remove,
  search,
  treeCategoryList,
  treeList,
} from "../../services/treeServices";
import Input from "../../shared/Input";
import { Context } from "../../Layout";

const Tree = () => {
  const { addNotification } = React.useContext(Context);
  const [layout, setLayout] = useState("grid");
  const [trees, setTrees] = useState([]);
  const [treeCategories, setTreeCategories] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [treeIds, setTreeIds] = useState([]);
  const [openTreeDeleteDialog, setOpenTreeDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState({
    tenCay: "",
    khuVuc: null,
    tuoiCay: null,
    loaiCay: null,
  });

  const [filterTmp, setFilterTmp] = useState({
    khuVuc: null,
    loaiCay: null,
    minTuoi: 0,
    maxTuoi: 10,
  });

  // useEffect(() => {
  //   const fetchData = async function () {
  //     const { data, total } = await treeList(page);
  //     setTotal(total);
  //     setTrees((prev) => {
  //       const ListId = prev.map(({ id }) => id);
  //       const newt = [
  //         ...prev,
  //         ...data.filter(({ id }) => !ListId.includes(id)),
  //       ];
  //       return newt;
  //     });
  //   };
  //   fetchData();
  // }, [page]);

  useEffect(() => {
    const colors = ["#8B75D7", "#26A0FC", "#26E7A6", "#FBB938", "#FD8080"];
    const fetchData = async function () {
      const categories = await treeCategoryList();
      categories.sort(({ count: a }, { count: b }) => b - a);
      const total = categories.reduce((sum, { count }) => (sum += count), 0);
      const list = categories.map((category) => {
        return {
          ...category,
          ratio: (category.count / total) * 100,
          color: colors.shift() || "#A8A8A8",
        };
      });
      const other = list.slice(5).reduce(
        (pre, cur) => {
          return {
            ...pre,
            treeQty: pre.count + cur.count,
            ratio: pre.ratio + cur.ratio,
          };
        },
        { tenLoaicay: "Khác", count: 0, ratio: 0, color: "#A8A8A8" }
      );
      const chartData = list.slice(0, 5);
      chartData.push(other);
      setChartData(chartData);
      setTreeCategories(list);
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function searchTree() {
      const { data, total } = await search(filter, page);
      setTotal(total);
      setTrees(
        page === 1
          ? data
          : (prev) => {
              const ListId = prev.map(({ id }) => id);
              const newt = [
                ...prev,
                ...data.filter(({ id }) => !ListId.includes(id)),
              ];
              return newt;
            }
      );
    }

    searchTree();
  }, [filter, page]);

  const getMore = () => {
    setPage((page) => page + 1);
  };

  const removeTrees = () => {
    setDeleteLoading(true);
    async function removeTree() {
      const res = await remove({ ids: treeIds });
      console.log(res);
      setFilter({ ...filter });
      addNotification("Thành công", `Đã xóa ${treeIds.length} cây!`);
      setTreeIds([]);
      setOpenTreeDeleteDialog(false);
      setDeleteLoading(false);
    }
    removeTree();
  };

  const onChange = (setState, name, type) => (e) => {
    setPage(1);
    const { key } = e;

    if (type === "select") {
      const { value } = e;
      setState((prev) => ({ ...prev, [name]: value }));
    }

    if (key === "Enter") {
      if (type === "search") {
        const { value } = e.target;
        setState((state) => ({ ...state, [name]: value }));
      }
    }
  };

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

  const toEditPage = (id) => () => {
    navigate("edit/" + id);
  };

  const cateOptions = treeCategories.map(({ id, tenLoaiCay }) => ({
    label: tenLoaiCay,
    value: id,
  }));
  const khuVucOptions = [
    {
      label: "Cẩm Lệ",
      value: "Cẩm Lệ",
    },
    {
      label: "Liên Chiểu",
      value: "Liên Chiểu",
    },
    {
      label: "Sơn Trà",
      value: "Sơn Trà",
    },
    {
      label: "Hải Châu",
      value: "Hải Châu",
    },
    {
      label: "Thanh Khê",
      value: "Thanh Khê",
    },
    {
      label: "Ngũ Hành Sơn",
      value: "Ngũ Hành Sơn",
    },
  ];

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
            <div className="relative">
              <button
                className="font-semibold text-button-color translate-y-hover border border-r-0 rounded-l-[0.6rem] flex gap-[0.5rem] items-center p-[0.5rem] border-border-color pr-[0.6rem]"
                onClick={() => {
                  setOpenFilter(!openFilter);
                }}
              >
                <MdFilterList size={"1.6rem"} fill={buttonColor} /> Bộ lọc
              </button>
              <CSSTransition
                in={openFilter}
                timeout={300}
                classNames="dialog-slide-up"
                unmountOnExit
              >
                <div className="absolute z-[12] top-[120%] left-[50%] translate-x-[-50%] bg-white min-w-[25rem] w-max p-2 shadow-lg rounded-[0.6rem] flex flex-col gap-2">
                  <Input
                    type="select"
                    name="loaiCay"
                    onChange={onChange(setFilterTmp, "loaiCay", "select")}
                    options={cateOptions}
                    startValue={
                      cateOptions.find(
                        ({ value }) => value === filterTmp.loaiCay
                      ) || null
                    }
                    placeHolder="Chọn loại cây"
                    label="Loại cây"
                  />
                  <div className="flex flex-col gap-[0.6rem]">
                    <label className="font-semibold text-[1.4rem]">
                      Tuổi cây
                    </label>
                    <p className="font-medium text-[1.2rem]">{`Từ ${filterTmp.minTuoi} đến ${filterTmp.maxTuoi} tuổi`}</p>
                    <Slider
                      range
                      step={1}
                      min={0}
                      max={10}
                      value={[filterTmp.minTuoi, filterTmp.maxTuoi]}
                      marks={{
                        0: 0,
                        10: 10,
                      }}
                      onChange={([min, max]) => {
                        setFilterTmp({
                          ...filterTmp,
                          minTuoi: min,
                          maxTuoi: max,
                        });
                      }}
                    />
                  </div>
                  <div className="mt-[1.4rem]">
                    <Input
                      type="select"
                      name="khuVuc"
                      onChange={onChange(setFilterTmp, "khuVuc", "select")}
                      options={khuVucOptions}
                      startValue={
                        khuVucOptions.find(
                          ({ value }) => value === filterTmp.khuVuc
                        ) || null
                      }
                      placeHolder="Chọn khu vực"
                      label="Khu vực"
                    />
                  </div>
                  <div className="flex gap-1 justify-end">
                    <button
                      className="py-1 px-2 bg-slate-50 font-semibold text-[1.2rem] rounded-[0.6rem]"
                      onClick={() => {
                        setFilter({
                          tenCay: "",
                          khuVuc: null,
                          tuoiCay: null,
                          loaiCay: null,
                        });
                        setFilterTmp({
                          khuVuc: null,
                          minTuoi: 0,
                          maxTuoi: 10,
                          loaiCay: null,
                        });
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="py-1 px-2 bg-primary font-semibold text-[1.2rem] rounded-[0.6rem] text-white"
                      onClick={() => {
                        const { minTuoi, maxTuoi, ...conLai } = filterTmp;
                        setFilter({
                          ...filter,
                          ...conLai,
                          tuoiCay: [minTuoi, maxTuoi],
                        });
                        setOpenFilter(!openFilter);
                      }}
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </CSSTransition>
            </div>
            <div className="relative">
              <input
                type="search"
                className="outline-none font-semibold text-button-color border  flex gap-[0.5rem] items-center p-[0.5rem] pl-[2.5rem] border-border-color pr-[0.6rem]"
                placeholder="Tìm kiếm"
                onKeyUp={onChange(setFilter, "tenCay", "search")}
              />
              <RiSearchLine
                size={"1.6rem"}
                fill={buttonColor}
                className="absolute top-[50%] left-[0.5rem] translate-y-[-50%]"
              />
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
                  handleClick={removeTrees}
                  loading={deleteLoading}
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
            {trees.length === 0 && (
              <p className="font-semibold text-[1.2rem] text-center">Trống</p>
            )}
            {layout === "grid" ? (
              <div className="grid grid-cols-4 gap-1">
                {trees.map((tree) => (
                  <TreeCard
                    key={tree.id}
                    {...tree}
                    checked={treeIds.includes(tree.id)}
                    handleCheck={handleCheck}
                    onEdit={toEditPage(tree.id)}
                  />
                ))}
              </div>
            ) : undefined}
          </div>
          <div className="p-1 text-center">
            {total > trees.length && (
              <button
                className="translate-y-hover border rounded-full bg-white px-[1.6rem] py-[0.8rem] text-[1.2rem] font-semibold"
                onClick={getMore}
              >
                Tải thêm
              </button>
            )}
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
          {chartData.map(({ tenLoaicay, count, ratio, color }, index) => (
            <div
              key={index}
              style={{ width: ratio + "%", backgroundColor: color }}
              className="h-[100%] inline-block relative group first:rounded-l-[0.4rem] last:rounded-r-[0.4rem]"
            >
              <div className="group-hover:top-[50%] group-hover:opacity-100 group-hover:visible p-[0.6rem] shadow-md absolute bg-white min-w-max right-0 rounded-[0.4rem] top-[55%] transition-all duration-300 opacity-0 invisible">
                <strong>{tenLoaicay}</strong>
                <br />
                <span className="">{count} cây</span>
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
            {treeCategories.map((cate) => (
              <TypeOfTree key={cate.id} {...cate} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tree;
