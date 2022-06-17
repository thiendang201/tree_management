import { MdInsertChart } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import { primaryColor } from "../../config";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { useState } from "react";

const Statistic = () => {
  const [treeFilter, setTreeFilter] = useState({
    idLoaiCay: -1,
    tuoiCay: [-1, -1],
    tinhTrang: -1,
    khuVuc: "",
  });
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
      <div className="grid grid-cols-[66%_34%] min-h-content border border-border-color border-t-0">
        <div className="p-2">
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
        <div>
          <div>
            <h2 className="font-semibold text-[1.8rem] py-1 border-b border-border-color">
              Loại cây
            </h2>
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
