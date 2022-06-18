import Input from "../../shared/Input";
import { useEffect, useState } from "react";
import { ImArrowRight2 } from "react-icons/im";
import FluentTaskListSquareLtr24Filled from "../../assets/icons/FluentTaskListSquareLtr24Filled";
import { buttonColor } from "../../config";
import Button from "../../shared/Button";
import {
  MdClear,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { treeList } from "../../services/treeServices";
import DefaultImg from "../../assets/images/default.jpg";

const AddPlan = () => {
  const [DSNhanVien, setDSNhanVien] = useState([
    { label: "Nguyễn Văn A", value: "NV1" },
    { label: "Nguyễn Văn B", value: "NV2" },
    { label: "Nguyễn Văn C", value: "NV3" },
  ]);
  const doUuTien = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
  ];

  const [DSCay, setDSCay] = useState([]);
  const [keHoach, setKeHoach] = useState({
    tenKeHoach: "",
    diaDiem: "",
    moTa: "",
    idNVPhuTrach: 1,
    ngayBatDau: new Date(),
    ngayKetThuc: new Date(),
    doUuTien: doUuTien[0].value,
    DSCay: [],
    DSCongViec: [],
    touched: {
      tenKeHoach: false,
      diaDiem: false,
      moTa: false,
      DSCay: false,
    },
  });
  const [congViec, setCongViec] = useState({
    tenCongViec: "",
    ngayBatDau: new Date(),
    ngayKetThuc: new Date(),
    DSNhanVien: [],
  });
  const [openTreeSelect, setOpenTreeSelect] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      const { data } = await treeList(1);
      setDSCay((prev) => {
        const ListId = prev.map(({ id }) => id);
        const newt = [
          ...prev,
          ...data.filter(({ id }) => !ListId.includes(id)),
        ];
        return newt;
      });
    };
    fetchData();
  }, []);

  const onBlur = (name) => () => {
    setKeHoach({ ...keHoach, touched: { ...keHoach.touched, [name]: true } });
  };

  const onChange = (setState, type, name) => (data) => {
    if (type === "select") {
      const { value } = data;
      setState((prev) => ({ ...prev, [name]: value }));
      return;
    }

    if (type === "select-multi") {
      const valueList = data.map(({ value }) => value);
      setState((prev) => ({ ...prev, [name]: valueList }));
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

  const onChangeTreeList = (id) => () => {
    const isExists = keHoach.DSCay.includes(id);
    const ListId = [...keHoach.DSCay, id];
    const isOver = DSCay.length === ListId.length;

    isExists &&
      setKeHoach({
        ...keHoach,
        DSCay: keHoach.DSCay.filter((_id) => _id !== id),
      });
    !isExists && setKeHoach({ ...keHoach, DSCay: ListId });
    isOver && setOpenTreeSelect(false);
    console.log(isOver);
  };

  const validateKeHoach = () => {
    const { tenKeHoach, moTa, DSCay, DSCongViec, diaDiem } = keHoach;
    const {
      tenKeHoach: t,
      moTa: m,
      DSCay: dsc,
      DSCongViec: dscv,
      diaDiem: d,
    } = keHoach.touched;
    return {
      etenKeHoach: t && !tenKeHoach ? "Hãy nhập tên kế hoạch" : "",
      emoTa: m && !moTa ? "Hãy nhập mô tả" : "",
      ediaDiem: d && !diaDiem ? "Hãy nhập địa điểm" : "",
      eDSCay: dsc && !DSCay.length ? "Hãy thêm ít nhất 1 cây" : "",
      eDSCongViec: dscv && !DSCongViec ? "Hãy thêm công việc" : "",
    };
  };

  const { etenKeHoach, emoTa, eDSCay, eDSCongViec, ediaDiem } =
    validateKeHoach();

  console.log(keHoach.touched);

  return (
    <div className="p-2">
      <div className="flex justify-between items-center p-1 border rounded-t-[2.5rem] border-border-color ">
        <div className="flex gap-1 items-center">
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <FluentTaskListSquareLtr24Filled size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">Quản lý kế hoạch</h2>
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <ImArrowRight2 size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">Thêm kế hoạch</h2>
        </div>
        <div>
          <Button
            text="Lưu"
            // onClick={ThemBenh}
            icon={<MdSave size={"2rem"} fill="#fff" />}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 border border-border-color p-2 border-y-0">
        <div className="flex flex-col gap-[1.4rem]">
          <Input
            name="tenKeHoach"
            placeHolder="Điền tên kế hoạch"
            label=" Tên kế hoạch"
            onChange={onChange(setKeHoach, "text", "tenKeHoach")}
            startValue={keHoach.tenKeHoach}
            onBlur={onBlur("tenKeHoach")}
            error={etenKeHoach}
          />
          <Input
            type="textarea"
            name="moTa"
            placeHolder="Điền mô tả kế hoạch"
            label="Mô tả"
            onChange={onChange(setKeHoach, "text", "moTa")}
            startValue={keHoach.moTa}
            className="resize-y min-h-[13.2rem]"
            onBlur={onBlur("moTa")}
            error={emoTa}
          />
          <Input
            type="select"
            name="idNVPhuTrach"
            onChange={onChange(setKeHoach, "select", "idNVPhuTrach")}
            options={DSNhanVien}
            placeHolder="Chọn nhân viên phụ trách"
            label="Nhân viên phụ trách"
            // error={sauBenhErrors.mucDo}
          />
        </div>
        <div className="flex flex-col gap-[1.4rem]">
          <Input
            name="diaDiem"
            placeHolder="Điền địa điểm"
            label="Địa điểm"
            onChange={onChange(setKeHoach, "text", "diaDiem")}
            startValue={keHoach.diaDiem}
            onBlur={onBlur("diaDiem")}
            error={ediaDiem}
          />
          <Input
            type="select"
            name="doUuTien"
            onChange={onChange(setKeHoach, "select", "doUuTien")}
            options={doUuTien}
            placeHolder="Độ ưu tiên"
            label="Độ ưu tiên"
            // error={sauBenhErrors.mucDo}
          />
          <Input
            type="date"
            label="Ngày bắt đầu"
            startValue={keHoach.ngayBatDau}
            onChange={onChange(setKeHoach, "date", "ngayBatDau")}
            className="w-[100%]"
          />
          <Input
            type="date"
            label="Ngày kết thúc"
            startValue={keHoach.ngayKetThuc}
            onChange={onChange(setKeHoach, "date", "ngayKetThuc")}
            className="w-[100%]"
          />
        </div>
        <div className="flex flex-col gap-[1.4rem]">
          <div className="relative">
            <label className="font-semibold text-[1.4rem]">Cây xanh</label>
            <button
              onClick={() => {
                setOpenTreeSelect(!openTreeSelect);
              }}
              onBlur={onBlur("DSCay")}
              className={`bg-[#FAFBFD] mt-[0.6rem] rounded-[0.4rem] px-[1.4rem] py-[1.1rem] text-[1.2rem] font-medium outline-none relative text-left text-[#9FABC6] flex justify-between items-center w-[100%] }`}
            >
              Chọn cây xanh <MdKeyboardArrowDown size={24} fill={buttonColor} />
            </button>

            <CSSTransition
              in={openTreeSelect}
              timeout={300}
              classNames="dialog-slide-up"
              unmountOnExit
            >
              <ul className="absolute min-w-[100%] top-[120%] left-[50%] translate-x-[-50%] bg-white shadow-lg max-h-[300px] overflow-y-auto rounded-[0.6rem] py-1">
                {DSCay.filter(({ id }) => !keHoach.DSCay.includes(id)).map(
                  ({ id, tenCay, hinhAnh, viTri }) => (
                    <li
                      key={id}
                      className="flex gap-1 p-1 border-b border-border-color hover:bg-slate-50 transition-all duration-300"
                      onClick={onChangeTreeList(id)}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${hinhAnh || DefaultImg})`,
                        }}
                        className="rounded-[1rem] h-[5rem] w-[5rem] bg-center bg-no-repeat bg-cover shadow-lg"
                      ></div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-[1.2rem] font-semibold">{`${id} - ${tenCay}`}</h3>
                        <p className="font-medium">{viTri}</p>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </CSSTransition>
          </div>
          <div>
            <h2 className="font-semibold text-[1.4rem] inline-block">
              Danh sách cây xanh
            </h2>{" "}
            <ul className="min-w-[100%] bg-white max-h-[300px] overflow-y-auto rounded-[0.6rem] py-1 border-b border-x-border-color">
              {keHoach.DSCay.length === 0 && !keHoach.touched.DSCay === 0 && (
                <p className="text-center font-medium text-[1.2rem]">Trống</p>
              )}
              {eDSCay && (
                <p className="ml-[0.6rem] text-danger text-center text-[1.2rem]">
                  {eDSCay}
                </p>
              )}
              {DSCay.filter(({ id }) => keHoach.DSCay.includes(id)).map(
                ({ id, tenCay, hinhAnh, viTri }) => (
                  <li
                    key={id}
                    className="flex justify-between p-1 border-b border-border-color hover:bg-slate-50 transition-all duration-300"
                  >
                    <div className="flex gap-1">
                      <div
                        style={{
                          backgroundImage: `url(${hinhAnh || DefaultImg})`,
                        }}
                        className="rounded-[1rem] h-[5rem] w-[5rem] bg-center bg-no-repeat bg-cover shadow-lg"
                      ></div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-[1.2rem] font-semibold">{`${id} - ${tenCay}`}</h3>
                        <p className="font-medium">{viTri}</p>
                      </div>
                    </div>
                    <button className="p-1" onClick={onChangeTreeList(id)}>
                      <MdClear size={20} />
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="border border-border-color p-2 border-t-0 rounded-b-[2.5rem]">
        <div className="border-t border-border-color grid grid-cols-[390px_1fr] gap-2 pt-3">
          <div className="flex flex-col gap-[1.4rem]">
            <Input
              name="tenCongViec"
              placeHolder="Điền tên công việc"
              label=" Tên công việc"
              onChange={onChange(setCongViec, "text", "tenCongViec")}
              startValue={congViec.tenCongViec}
            />
            <Input
              type="date"
              label="Ngày bắt đầu"
              startValue={congViec.ngayBatDau}
              onChange={onChange(setCongViec, "date", "ngayBatDau")}
              className="w-[100%]"
            />
            <Input
              type="date"
              label="Ngày kết thúc"
              startValue={congViec.ngayKetThuc}
              onChange={onChange(setCongViec, "date", "ngayKetThuc")}
              className="w-[100%]"
            />
            <Input
              type="select"
              name="DSNhanVien"
              onChange={onChange(setCongViec, "select-multi", "DSNhanVien")}
              options={DSNhanVien}
              isMulti
              placeHolder="Chọn nhân viên phụ trách"
              label="Nhân viên phụ trách"
              // error={sauBenhErrors.mucDo}
            />
            <div className="flex justify-end">
              <Button
                text="Thêm"
                // onClick={ThemBenh}
                icon={<MdSave size={"2rem"} fill="#fff" />}
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-[1.4rem]">Danh sách công việc</h2>
            <table className="w-[100%] mt-[0.6rem]">
              <thead className="bg-[#F7F8FA]">
                <tr>
                  <th className="py-[1.4rem] px-1 text-[1.2rem] text-left">
                    Tên kế hoạch
                  </th>
                  <th className="py-[1.4rem] text-[1.2rem] text-left">
                    Danh sách nhân viên
                  </th>
                  <th className="py-[1.4rem] text-[1.2rem]">Bắt đầu</th>
                  <th className="py-[1.4rem] text-[1.2rem]">Kết thúc</th>
                  <th className="py-[1.4rem] text-[1.2rem]">#</th>
                </tr>
              </thead>
              <tbody>
                {keHoach.DSCongViec.map(
                  (
                    { tenCongViec, DSNhanVien, ngayBatDau, ngayKetThuc },
                    index
                  ) => (
                    <tr
                      className="font-semibold border-b border-border-color"
                      key={index}
                    >
                      <td className="py-[1.6rem] text-[1.2rem]">
                        {tenCongViec}
                      </td>
                      <td className="py-[1.6rem] text-[1.2rem] ">
                        {DSNhanVien}
                      </td>
                      <td className="text-center py-[1.6rem] text-[1.2rem]">
                        {ngayBatDau}
                      </td>
                      <td className="text-center py-[1.6rem] text-[1.2rem]">
                        {ngayKetThuc}
                      </td>
                      <td className="text-center py-[1.6rem] text-[1.2rem]">
                        <button className="ml-1">
                          <MdEdit size={18} />
                        </button>
                        <button className="ml-1">
                          <MdDelete size={18} />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {keHoach.DSCongViec.length === 0 && (
              <p className="text-center font-medium text-[1.2rem] p-2 border-b border-border-color">
                Trống
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlan;
