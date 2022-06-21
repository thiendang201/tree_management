import { MdInsertChart } from "react-icons/md";
import Chart from "react-apexcharts";
import { BiExport } from "react-icons/bi";
import { primaryColor } from "../../config";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { useEffect, useState } from "react";
import { treeCategoryList } from "../../services/treeServices";

const Statistic = () => {
  const [treeCategories, setTreeCategories] = useState([]);
  const [chartCate, setChartCate] = useState({
    total: 0,
    data: [],
  });
  const [treeFilter, setTreeFilter] = useState({
    idLoaiCay: -1,
    tuoiCay: [-1, -1],
    tinhTrang: -1,
    khuVuc: "",
  });

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

  console.log(chartCate);

  const onChange = (setState, type, name) => (data) => {
    if (type === "select") {
      const { value } = data;
      setState((prev) => ({ ...prev, [name]: value }));
      return;
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
            <div>
              <Input
                type="select"
                name="idLoaiCay"
                onChange={onChange()}
                options={null}
                placeHolder="Chọn loại cây"
                label="Loại cây"
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-[1.8rem] py-1 border-b border-border-color">
              Kế hoạch
            </h2>
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
            <h2 className="font-semibold text-[1.8rem] py-1 border-b border-border-color">
              Sự cố
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
