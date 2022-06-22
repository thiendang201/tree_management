import { MdAddCircle, MdSave } from "react-icons/md";
import { ImArrowRight2 } from "react-icons/im";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

import FluentTreeDeciduous20Filled from "../../assets/icons/FluentTreeDeciduous20Filled";
import { buttonColor } from "../../config";
import Button from "../../shared/Button";
import Input from "../../shared/Input";

const AddTree = () => {
  const options = [
    { value: "1", label: "Cây họ bàng" },
    { value: "2", label: "Cây lá rộng" },
    { value: "3", label: "Cây lá nhỏ" },
  ];
  const mucDo = [
    { value: "1", label: "Nhẹ" },
    { value: "2", label: "Vừa" },
    { value: "3", label: "Nặng" },
  ];

  const [tree, setTree] = useState({
    idLoaiCay: null,
    tenCay: "",
    ngayTrong: new Date(),
    viTri: "",
    hinhAnh: [],
    tinhTrangSauBenh: [],
  });

  const [sauBenh, setSauBenh] = useState({
    tenBenh: "",
    mucDo: null,
    moTa: "",
    ngayPhatBenh: new Date(),
    ngayHet: null,
    hinhAnh: [],
    touched: {
      tenBenh: false,
      moTa: false,
    },
  });

  const onSelect = ({ value }) => {
    setTree({ ...tree, idLoaiCay: value });
  };

  const onDateChange = (date) => {
    setTree({ ...tree, ngayTrong: date });
  };

  const ThemBenh = () => {
    setTree({ ...tree, tinhTrangSauBenh: [...tree.tinhTrangSauBenh, sauBenh] });
    setSauBenh({
      tenBenh: "",
      mucDo: null,
      moTa: "",
      ngayPhatBenh: new Date(),
      ngayHet: null,
      hinhAnh: [],
      touched: {
        tenBenh: false,
        moTa: false,
      },
    });
  };

  const onBlurSauBenh = (name) => (e) => {
    setSauBenh({ ...sauBenh, touched: { ...sauBenh.touched, [name]: true } });
  };
  const validateSauBenh = () => {
    const errors = {
      tenBenh: "",
      moTa: "",
    };

    if (sauBenh.touched.tenBenh && !sauBenh.tenBenh)
      errors.tenBenh = "Vui lòng nhập tên bệnh!";
    if (sauBenh.touched.moTa && !sauBenh.moTa)
      errors.moTa = "Vui lòng nhập mô tả!";

    return errors;
  };

  console.log(tree);
  console.log(JSON.stringify(tree));
  // console.log(sauBenh);

  const sauBenhErrors = validateSauBenh();

  return (
    <div className="p-[2rem] pb-0">
      <div className="flex justify-between items-center p-1 border rounded-t-[2.5rem] border-border-color ">
        <div className="flex gap-1 items-center">
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <FluentTreeDeciduous20Filled size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">Quản lý cây xanh</h2>
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <ImArrowRight2 size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">Thêm cây xanh</h2>
        </div>
        <div>
          <Button text="Lưu" icon={<MdSave size={"2rem"} fill="#fff" />} />
        </div>
      </div>
      <div className="grid grid-cols-[66%_34%] min-h-content border border-border-color border-t-0">
        <div className="p-2">
          <div>
            <div className="flex items-center py-2 px-[2rem] border rounded-t-[2.5rem] border-border-color">
              <h2 className="text-[1.4rem] font-semibold">Hình ảnh</h2>
            </div>
            <div className="border border-border-color border-t-0 rounded-b-[2.5rem] p-2 bg-[#FAFBFD] tree-img">
              <Input
                type="image"
                startValue={tree.hinhAnh}
                onChange={(files) => {
                  setTree({ ...tree, hinhAnh: files });
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center py-2 px-[2rem] border rounded-t-[2.5rem] border-border-color mt-2">
              <h2 className="text-[1.4rem] font-semibold">
                Tình trạng sâu bệnh
              </h2>
            </div>
            <div className="border border-border-color border-t-0 rounded-b-[2.5rem] p-2 ">
              <div className="grid grid-cols-2 gap-x-1 gap-y-2">
                <Input
                  name="tenBenh"
                  placeHolder="Điền tên bệnh"
                  label=" Tên bệnh"
                  onChange={({ target: { value, name } }) => {
                    setSauBenh({ ...sauBenh, [name]: value });
                  }}
                  onBlur={onBlurSauBenh("tenBenh")}
                  error={sauBenhErrors.tenBenh}
                  startValue={sauBenh.tenBenh}
                />
                <Input
                  type="select"
                  name="mucDo"
                  onChange={({ value }) => {
                    setSauBenh({ ...sauBenh, mucDo: value });
                  }}
                  options={mucDo}
                  placeHolder="Chọn mức độ"
                  label="Mức độ"
                  // onBlur={onBlurSauBenh("mucDo")}
                  error={sauBenhErrors.mucDo}
                />
                <div className="col-span-2">
                  <Input
                    type="textarea"
                    name="moTa"
                    placeHolder="Điền mô tả tình trạng bệnh"
                    label="Mô tả"
                    className="resize-y min-h-[16rem]"
                    onChange={({ target: { value, name } }) => {
                      setSauBenh({ ...sauBenh, [name]: value });
                    }}
                    onBlur={onBlurSauBenh("moTa")}
                    error={sauBenhErrors.moTa}
                    startValue={sauBenh.moTa}
                  />
                </div>
                <Input
                  type="date"
                  label="Ngày phát bệnh"
                  startValue={sauBenh.ngayPhatBenh}
                  onChange={(date) => {
                    setSauBenh({ ...sauBenh, ngayPhatBenh: date });
                  }}
                  className="w-[100%]"
                />
                <Input
                  type="date"
                  label="Ngày hết"
                  startValue={sauBenh.ngayHet}
                  onChange={(date) => {
                    setSauBenh({ ...sauBenh, ngayHet: date });
                  }}
                  className="w-[100%]"
                  placeHolder="Chọn ngày"
                />
                <div className="col-span-2">
                  <label className="font-semibold text-[1.4rem]">
                    Hình ảnh
                  </label>
                  <div className="p-1 mt-[0.6rem] bg-[#FAFBFD] pest-img rounded-[0.4rem]">
                    <Input
                      type="image"
                      startValue={sauBenh.hinhAnh}
                      onChange={(files) => {
                        setSauBenh({ ...sauBenh, hinhAnh: files });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                {Object.values(sauBenh.touched).some((touched) => !touched) ||
                Object.values(sauBenhErrors).some((err) => err) ? (
                  <Button
                    type="disable"
                    text="Thêm"
                    icon={<MdSave size={"2rem"} fill="#fff" />}
                  />
                ) : (
                  <Button
                    text="Thêm"
                    onClick={ThemBenh}
                    icon={<MdSave size={"2rem"} fill="#fff" />}
                  />
                )}
              </div>
              <div>
                <h2 className="text-[1.4rem] font-semibold border-t border-border-color py-2 mt-2">
                  Lịch sử sâu bệnh
                </h2>
                <div>
                  {tree.tinhTrangSauBenh.length === 0 && (
                    <p className="text-[1.2rem] font-medium text-center">
                      Cây chưa bị sâu bệnh!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-l border-border-color pt-4 px-2">
          <div className="sticky top-[7.8rem] flex flex-col gap-3">
            <Input
              type="select"
              name="idLoaiCay"
              onChange={onSelect}
              options={options}
              placeHolder="Chọn loại cây"
              label="Loại cây"
            />
            <Input
              name="tenCay"
              placeHolder="Điền tên cây"
              label=" Tên cây"
              onChange={({ target: { value, name } }) => {
                setTree({ ...tree, [name]: value });
              }}
            />
            <Input
              type="date"
              label="Ngày trồng"
              startValue={tree.ngayTrong}
              onChange={onDateChange}
              className="w-[100%]"
            />
            <Input
              name="viTri"
              placeHolder="Điền vị trí"
              label="Vị trí"
              onChange={({ target: { value, name } }) => {
                setTree({ ...tree, [name]: value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTree;
