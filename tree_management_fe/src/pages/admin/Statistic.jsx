import { MdInsertChart, MdKeyboardArrowDown } from "react-icons/md";

import Chart from "react-apexcharts";
import { BiExport, BiReset } from "react-icons/bi";
import { buttonColor, primaryColor } from "../../config";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { useEffect, useState } from "react";
import { treeCategoryList, treeStatistic } from "../../services/treeServices";
import FluentTreeDeciduous20Filled from "../../assets/icons/FluentTreeDeciduous20Filled";
import { CSSTransition } from "react-transition-group";
import Slider from "rc-slider";
import { format, getMonth, getYear } from "date-fns";
import { planStatistic } from "../../services/planservices";
import PlanItem from "../../components/plan/PlanItem";
import { troubleStatistic } from "../../services/troubleServices";

const Statistic = () => {
  const [trees, setTrees] = useState({
    data: [],
    total: 0,
  });
  const [plans, setPlans] = useState({
    data: [],
    total: 0,
  });
  const [troubles, setTroubles] = useState({
    data: [],
    total: 0,
  });
  const [treeCategories, setTreeCategories] = useState([]);
  const [chartCate, setChartCate] = useState({
    total: 0,
    data: [],
  });
  const [chartTrouble, setChartTrouble] = useState([]);
  const [treeFilter, setTreeFilter] = useState({
    tree_category: null,
    age: null,
    status: null,
    position: null,
    page: 1,
  });
  const [planFilter, setPlanFilter] = useState({
    month: new Date(),
    status: "1",
    page: 1,
  });
  const [troubleFilter, setTroubleFilter] = useState({
    year: new Date(),
    page: 1,
  });

  const [openDiaLog, setOpenDialog] = useState({
    treeAge: false,
  });

  useEffect(() => {
    async function fetchData() {
      const { data, total } = await treeStatistic(treeFilter, treeFilter.page);
      const newData =
        treeFilter.page === 1
          ? data
          : (prev) => {
              const ListId = prev.map(({ id }) => id);
              const newt = [
                ...prev,
                ...data.filter(({ id }) => !ListId.includes(id)),
              ];
              return newt;
            };
      setTrees({ total: total, data: newData });
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeFilter]);

  useEffect(() => {
    async function fetchData() {
      const { month, status, page } = planFilter;
      const { data, total } = await planStatistic(
        status,
        getYear(month),
        getMonth(month) + 1,
        page
      );
      const newData =
        page === 1
          ? data
          : (prev) => {
              const ListId = prev.map(({ id }) => id);
              const newt = [
                ...prev,
                ...data.filter(({ id }) => !ListId.includes(id)),
              ];
              return newt;
            };
      setPlans({ total: total, data: newData });
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planFilter]);

  useEffect(() => {
    async function fetchData() {
      const { year, page } = troubleFilter;
      const { data, total } = await troubleStatistic(getYear(year), page);
      const newData =
        page === 1
          ? data
          : (prev) => {
              const ListId = prev.map(({ id }) => id);
              const newt = [
                ...prev,
                ...data.filter(({ id }) => !ListId.includes(id)),
              ];
              return newt;
            };
      setTroubles({ total: total, data: newData });
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [troubleFilter]);

  useEffect(() => {
    const data = [];
    for (let i = 1; i <= 12; i++) {
      data.push({
        label: i < 10 ? "0" + i : i,
        count: troubles.data.reduce((prev, { created_at }) => {
          const [, m] = created_at.split(" ")[0].split("-");
          return m * 1 === i ? prev + 1 : prev;
        }, 0),
      });
    }
    setChartTrouble(data);
  }, [troubles]);

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
        { tenLoaiCay: "Khác", count: 0, ratio: 0, color: "#A8A8A8" }
      );

      const chartData = list.slice(0, 5);
      other.count && chartData.push(other);
      setChartCate({ data: chartData, total: total });
      setTreeCategories(list);
    };
    fetchData();
  }, []);

  const onChange = (setState, type, name) => (data) => {
    if (type === "select") {
      const { value } = data;
      setState((prev) => ({ ...prev, [name]: value }));
      return;
    }

    if (type === "radio") {
      const {
        target: { value },
      } = data;
      setState((prev) => ({ ...prev, [name]: value }));
    }

    if (type === "select-multi") {
      setState((prev) => ({ ...prev, [name]: value }));
      return;
    }
    if (type === "date") {
      setState((prev) => ({ ...prev, [name]: data }));
      return;
    }

    const {
      target: { value },
    } = data;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDialog = (name) => () => {
    setOpenDialog({
      ...openDiaLog,
      [name]: !openDiaLog[name],
    });
  };

  const resetTreeFilter = () => {
    setTreeFilter({
      tree_category: null,
      age: null,
      status: null,
      position: null,
      page: 1,
    });
  };

  const getMore = (setState) => () => {
    setState((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const treeCateOptions = treeCategories.map(({ id, tenLoaiCay }) => ({
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
  const tinhTrangOptions = [
    {
      label: "Bình thường",
      value: 0,
    },
    {
      label: "Sâu bệnh",
      value: 1,
    },
  ];

  return (
    <div className="p-[2rem] pb-0">
      <div className="flex justify-between items-center p-1 border rounded-t-[2.5rem] border-border-color ">
        <div className="flex gap-1 items-center">
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <MdInsertChart size={24} color={primaryColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">
            Thống kê {" & "} báo cáo
          </h2>
        </div>
        <div>
          <Button
            text="Xuất file"
            icon={<BiExport size={"2rem"} fill="#fff" />}
          />
        </div>
      </div>
      <div className="grid grid-cols-[70%_30%] min-h-content border border-border-color border-t-0">
        <div className="border-r border-border-color px-2 pt-2">
          <div>
            <h2 className="font-semibold text-[1.8rem] py-1 border-b border-border-color">
              Cây xanh
            </h2>
            <div className="flex gap-1 mt-3">
              <Input
                type="select"
                name="idLoaiCay"
                onChange={onChange(setTreeFilter, "select", "tree_category")}
                options={treeCateOptions}
                startValue={
                  treeCateOptions.find(
                    ({ value }) => value === treeFilter.tree_category
                  ) || null
                }
                placeHolder="Chọn loại cây"
                icon={
                  <FluentTreeDeciduous20Filled size={24} color={primaryColor} />
                }
              />
              <div className="relative">
                <button
                  onClick={handleDialog("treeAge")}
                  className={`bg-[#FAFBFD] mt-[0.6rem] rounded-[0.4rem] px-[1.4rem] py-[1.2rem] text-[1.2rem] font-medium outline-none relative text-left text-[#9FABC6] flex justify-between gap-[1.4rem] items-center w-[100%] }`}
                >
                  {treeFilter.age ? (
                    <p className="font-medium text-[#49587B] text-[1.2rem]">{`Từ ${
                      treeFilter.age && treeFilter.age[0]
                    } đến ${treeFilter.age && treeFilter.age[1]} tuổi`}</p>
                  ) : (
                    "Chọn tuổi cây"
                  )}

                  <MdKeyboardArrowDown size={24} fill={buttonColor} />
                </button>

                <CSSTransition
                  in={openDiaLog.treeAge}
                  timeout={300}
                  classNames="dialog-slide-up"
                  unmountOnExit
                >
                  <div className="absolute min-w-[200px] top-[120%] left-[50%] translate-x-[-50%] bg-white shadow-lg rounded-[0.6rem] p-2 pb-3">
                    <div className="flex flex-col gap-[0.6rem]">
                      <label className="font-semibold text-[1.4rem]">
                        Tuổi cây
                      </label>
                      {treeFilter.age && (
                        <p className="font-medium text-[#49587B] text-[1.2rem]">{`Từ ${
                          treeFilter.age && treeFilter.age[0]
                        } đến ${treeFilter.age && treeFilter.age[1]} tuổi`}</p>
                      )}
                      <Slider
                        range
                        step={1}
                        min={0}
                        max={10}
                        value={treeFilter.age || [0, 10]}
                        marks={{
                          0: 0,
                          10: 10,
                        }}
                        onChange={(minMax) => {
                          setTreeFilter({ ...treeFilter, age: minMax });
                        }}
                      />
                    </div>
                  </div>
                </CSSTransition>
              </div>
              <Input
                type="select"
                name="tinhTrang"
                onChange={onChange(setTreeFilter, "select", "status")}
                options={tinhTrangOptions}
                startValue={
                  tinhTrangOptions.find(
                    ({ value }) => value === treeFilter.status
                  ) || null
                }
                placeHolder="Chọn tình trạng"
              />
              <Input
                type="select"
                name="khuVuc"
                onChange={onChange(setTreeFilter, "select", "position")}
                options={khuVucOptions}
                startValue={
                  khuVucOptions.find(
                    ({ value }) => value === treeFilter.position
                  ) || null
                }
                placeHolder="Chọn khu vực"
              />
              {Object.values(treeFilter).some((item) => item) && (
                <div>
                  <button
                    onClick={resetTreeFilter}
                    className={`bg-[#FAFBFD] mt-[0.6rem] rounded-[0.4rem] px-[1.4rem] py-[1.4rem] text-[1.2rem] font-medium outline-none relative text-left text-[#49587B] flex justify-between gap-[0.6rem] items-center w-[100%] }`}
                  >
                    Reset
                    <BiReset size={20} fill={buttonColor} />
                  </button>
                </div>
              )}
            </div>
            <table className="w-[100%] mt-2">
              <thead className="bg-[#FAFBFD]">
                <tr>
                  <th className="py-[1.6rem] text-[1.2rem] w-[6%]">STT</th>
                  <th className="py-[1.6rem] text-[1.2rem] w-[6%]">ID</th>
                  <th className="py-[1.6rem] text-[1.2rem] text-left">
                    Tên cây
                  </th>
                  <th className="py-[1.6rem] w-[15%] text-[1.2rem] text-left">
                    Loại cây
                  </th>
                  <th className="py-[1.6rem] w-[12%] text-[1.2rem]">
                    Ngày trồng
                  </th>
                  <th className="py-[1.6rem] w-[14%] text-[1.2rem]">
                    Tình trạng
                  </th>
                  <th className="py-[1.6rem] w-[25%] text-[1.2rem] text-left">
                    Vị trí
                  </th>
                </tr>
              </thead>
              <tbody>
                {trees.data.map(
                  (
                    { id, tenCay, viTri, tenLoaiCay, ngayTrong, biBenh },
                    index
                  ) => {
                    const [y, m, d] = ngayTrong.split("-");

                    return (
                      <tr
                        className="font-semibold border-b border-border-color"
                        key={id}
                      >
                        <td className="text-center py-[1.6rem] text-[1.2rem]">
                          {index + 1}
                        </td>
                        <td className="py-[1.6rem] text-[1.2rem] text-center">
                          {id}
                        </td>
                        <td className="py-[1.6rem] text-[1.2rem]">{tenCay}</td>
                        <td className="py-[1.6rem] text-[1.2rem]">
                          {tenLoaiCay}
                        </td>
                        <td className="text-center py-[1.6rem] text-[1.2rem]">
                          {format(new Date(y, m - 1, d), "dd/MM/yyyy")}
                        </td>
                        <td className="text-center py-[1.6rem] text-[1.1rem] px-1">
                          <div
                            className={`px-[1.2rem] py-[0.6rem] rounded-full ${
                              biBenh
                                ? "bg-[#FBECE9] text-[#D6538C]"
                                : "bg-[#EFF2F7] text-[#6D88D2]"
                            }`}
                          >
                            {biBenh ? "Sâu bệnh" : "Bình thường"}
                          </div>
                        </td>
                        <td className="py-[1.6rem] text-[1.2rem]">{viTri}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            {trees.data.length === 0 && (
              <p className="py-2 font-semibold text-[1.2rem] border-b border-border-color text-center">
                Trống
              </p>
            )}

            {trees.total > trees.data.length && (
              <div className="p-1 text-center">
                <button
                  className="translate-y-hover border rounded-full bg-white px-[1.6rem] py-[0.8rem] text-[1.2rem] font-semibold"
                  onClick={getMore(setTreeFilter)}
                >
                  Tải thêm
                </button>
              </div>
            )}
          </div>
          <div className="mt-2 plan">
            <div className="flex justify-between items-baseline border-b border-border-color">
              <h2 className="font-semibold text-[1.8rem] py-1">Kế hoạch</h2>
              <Input
                type="date"
                startValue={planFilter.month}
                onChange={onChange(setPlanFilter, "date", "month")}
                className="w-[100%] bg-[#ffff] py-1 pr-0"
                dateFormat="MMMM, yyyy"
                showMonthYearPicker
                icon={<MdKeyboardArrowDown size={24} fill={buttonColor} />}
              />
            </div>
            <div className="flex gap-1">
              {[
                {
                  text: "Dự kiến",
                  value: "1",
                },
                {
                  text: "Đang triển khai",
                  value: "2",
                },
                {
                  text: "Đã hoàn thành",
                  value: "3",
                },
                {
                  text: "Quá hạn",
                  value: "0",
                },
              ].map(({ text, value }) => (
                <div key={value}>
                  <input
                    type="radio"
                    name="trangThaiKeHoach"
                    id={`trangThaiKeHoach${value}`}
                    className="appearance-none peer"
                    value={value}
                    checked={planFilter.status === value}
                    onChange={onChange(setPlanFilter, "radio", "status")}
                  />
                  <label
                    htmlFor={`trangThaiKeHoach${value}`}
                    className="block text-[1.2rem] font-semibold py-[0.8rem] px-[1.6rem] rounded-[0.4rem] peer-checked:bg-primary peer-checked:text-white bg-[#F7F8FA]"
                  >
                    {text}
                  </label>
                </div>
              ))}
            </div>
            <ul className="py-2">
              {plans.data.map((plan, index) => (
                <li key={plan.id}>
                  <PlanItem {...plan} index={index + 1} />
                </li>
              ))}
            </ul>
            {plans.data.length === 0 && (
              <p className="pb-2 font-semibold text-[1.2rem] border-b border-border-color text-center">
                Trống
              </p>
            )}

            {plans.total > plans.data.length && (
              <div className="p-1 text-center">
                <button
                  className="translate-y-hover border rounded-full bg-white px-[1.6rem] py-[0.8rem] text-[1.2rem] font-semibold"
                  onClick={getMore(setPlanFilter)}
                >
                  Tải thêm
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="px-2 pt-2">
          <div>
            <h2 className="font-semibold text-[1.8rem] py-1 border-b border-border-color">
              Loại cây
            </h2>
            <div className="pb-2 pt-3 relative">
              <Chart
                type="donut"
                series={chartCate.data.map(({ count }) => count)}
                options={{
                  chart: {
                    type: "donut",
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    width: 0,
                  },
                  colors: [
                    "#8B75D7",
                    "#26A0FC",
                    "#26E7A6",
                    "#FBB938",
                    "#FD8080",
                    "#A8A8A8",
                  ],
                  labels: chartCate.data.map(({ tenLoaiCay }) => tenLoaiCay),

                  legend: {
                    show: false,
                  },
                  // plotOptions: {
                  //   pie: {
                  //     donut: {
                  //       labels: {
                  //         show: true,
                  //         total: {
                  //           show: true,
                  //            label: chartCate.total,
                  //           formatter: () => "Cây",
                  //           showAlways: true,
                  //         },
                  //       },
                  //     },
                  //   },
                  // },
                }}
              />
              <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center ">
                <span className="text-[2.8rem] font-semibold">
                  {chartCate.total}
                </span>
                <span className="font-medium opacity-60 text-[1.6rem]">
                  cây xanh
                </span>
              </p>
            </div>
            <ul>
              {chartCate.data.map(({ tenLoaiCay, count, color }, index) => (
                <li
                  key={index}
                  className="flex justify-between text-[1.2rem] font-semibold p-1 border-b border-border-color"
                >
                  <div className="flex gap-1">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span>{tenLoaiCay}</span>
                  </div>
                  <span>{count} cây</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex trouble mt-2 justify-between items-baseline border-b border-border-color">
              <h2 className="font-semibold text-[1.8rem] py-1">Sự cố</h2>
              <Input
                type="date"
                startValue={planFilter.month}
                onChange={onChange(setTroubleFilter, "date", "year")}
                className="w-[100%] bg-[#ffff] py-1 pr-0"
                dateFormat="yyyy"
                showYearPicker
                maxDate={new Date()}
                icon={<MdKeyboardArrowDown size={24} fill={buttonColor} />}
              />
            </div>
            <div>
              <Chart
                type="area"
                series={[
                  {
                    name: "Sự cố",
                    data: chartTrouble.map(({ count }) => count),
                  },
                ]}
                options={{
                  chart: {
                    height: 280,
                    type: "area",
                  },
                  dataLabels: {
                    enabled: false,
                  },

                  fill: {
                    type: "gradient",
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.7,
                      opacityTo: 0.9,
                      stops: [0, 90, 100],
                    },
                  },
                  xaxis: {
                    categories: chartTrouble.map(({ label }) => label),
                  },
                }}
              />
            </div>
            <ul className="pb-2">
              {troubles.data.map(({ id, tieuDe, created_at, viTri }, index) => {
                const [y, m, d] = created_at.split(" ")[0].split("-");
                return (
                  <li key={id}>
                    <div className="grid grid-cols-[20%_80%] py-1 border-b border-border-color">
                      <div className="flex justify-center items-center text-[1.2rem] font-semibold">
                        {index}
                      </div>
                      <div>
                        <h2 className="font-semibold text-[1.4rem]">
                          {tieuDe}
                        </h2>
                        <p className="font-medium text-[1.2rem]">{viTri}</p>
                        <p className="font-medium text-[1.2rem]">
                          {format(new Date(y, m - 1, d), "dd/MM/yyyy")}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {troubles.data.length === 0 && (
              <p className="pb-2 font-semibold text-[1.2rem] border-b border-border-color text-center">
                Trống
              </p>
            )}

            {troubles.total > troubles.data.length && (
              <div className="p-1 text-center">
                <button
                  className="translate-y-hover border rounded-full bg-white px-[1.6rem] py-[0.8rem] text-[1.2rem] font-semibold"
                  onClick={getMore(setTroubleFilter)}
                >
                  Tải thêm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
