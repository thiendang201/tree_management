import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAddCircle, MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import FluentTaskListSquareLtr24Filled from "../../assets/icons/FluentTaskListSquareLtr24Filled";
import DoUuTien from "../../components/DoUuTien";
import { buttonColor } from "../../config";
import Button from "../../shared/Button";
import Input from "../../shared/Input";

const Plan = () => {
  const sapXepList = [
    { label: "Độ ưu tiên giảm dần", value: "ut_desc" },
    { label: "Độ ưu tiên tăng dần", value: "ut_asc" },
    { label: "Ngày bắt đầu giảm dần", value: "nbd_asc" },
    { label: "Ngày bắt đầu tăng dần", value: "nbd_asc" },
  ];
  const [DSKeHoach, setDSKeHoach] = useState([
    {
      id: 1,
      tenKeHoach: "Tỉa cây đón bão",
      diaDiem: "Phường Hòa thuận Tây",
      soNgay: 2,
      soLuongNV: 6,
      ngayBatDau: "25/04/2022",
      ngayKetThuc: "27/04/2022",
      doUuTien: 4,
    },
    {
      id: 2,
      tenKeHoach: "Tỉa cây đón bão",
      diaDiem: "Phường Hòa thuận Tây",
      soNgay: 2,
      soLuongNV: 6,
      ngayBatDau: "25/04/2022",
      ngayKetThuc: "27/04/2022",
      doUuTien: 4,
    },
    {
      id: 3,
      tenKeHoach: "Tỉa cây đón bão",
      diaDiem: "Phường Hòa thuận Tây",
      soNgay: 2,
      soLuongNV: 6,
      ngayBatDau: "25/04/2022",
      ngayKetThuc: "27/04/2022",
      doUuTien: 4,
    },
    {
      id: 4,
      tenKeHoach: "Tỉa cây đón bão",
      diaDiem: "Phường Hòa thuận Tây",
      soNgay: 2,
      soLuongNV: 6,
      ngayBatDau: "25/04/2022",
      ngayKetThuc: "27/04/2022",
      doUuTien: 4,
    },
    {
      id: 5,
      tenKeHoach: "Tỉa cây đón bão",
      diaDiem: "Phường Hòa thuận Tây",
      soNgay: 2,
      soLuongNV: 6,
      ngayBatDau: "25/04/2022",
      ngayKetThuc: "27/04/2022",
      doUuTien: 4,
    },
    {
      id: 6,
      tenKeHoach: "Tỉa cây đón bão",
      diaDiem: "Phường Hòa thuận Tây",
      soNgay: 2,
      soLuongNV: 6,
      ngayBatDau: "25/04/2022",
      ngayKetThuc: "27/04/2022",
      doUuTien: 4,
    },
    {
      id: 7,
      tenKeHoach: "Tỉa cây đón bão",
      diaDiem: "Phường Hòa thuận Tây",
      soNgay: 2,
      soLuongNV: 6,
      ngayBatDau: "25/04/2022",
      ngayKetThuc: "27/04/2022",
      doUuTien: 4,
    },
    {
      id: 8,
      tenKeHoach: "Tỉa cây đón bão",
      diaDiem: "Phường Hòa thuận Tây",
      soNgay: 2,
      soLuongNV: 6,
      ngayBatDau: "25/04/2022",
      ngayKetThuc: "27/04/2022",
      doUuTien: 4,
    },
  ]);

  const [sapXep, setSapXep] = useState(sapXepList[0].value);
  const onChangeSapXep = ({ value }) => {
    setSapXep(value);
  };
  const navigate = useNavigate();

  const toAddPlanPage = () => {
    navigate("add");
  };

  return (
    <div className="p-[2rem]">
      <div className="flex justify-between items-center p-1 border rounded-t-[2.5rem] border-border-color ">
        <div className="flex gap-1 items-center">
          <div className="bg-[#F7F8FA] rounded-full p-1">
            <FluentTaskListSquareLtr24Filled size={24} color={buttonColor} />
          </div>
          <h2 className="text-[1.4rem] font-semibold">Quản lý kế hoạch</h2>
        </div>
      </div>
      <div className="flex justify-between p-1 text-[1.2rem] border border-t-0 border-border-color sticky top-[5.9rem] bg-white z-10">
        <div></div>
        <div className="flex justify-end gap-1">
          <Input
            type="select"
            name="sapXep"
            onChange={onChangeSapXep}
            options={sapXepList}
            classNamePrefix="keHoachSX"
            className="mt-0"
          />
          <div className="flex justify-end items-stretch">
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder="Tìm kiếm kế hoạch"
                className="outline-none border border-border-color rounded-[0.4rem] py-[1rem] pl-[3.4rem] min-w-[24rem]  text-[1.2rem] pr-1 font-medium "
              />
              <RiSearchLine
                className="absolute translate-x-[1rem]"
                size={"2rem"}
                color={buttonColor}
              />
            </div>
          </div>
          <Button
            text="Thêm"
            icon={<MdAddCircle size={"2rem"} fill="#fff" />}
            className="rounded-[0.4rem] py-0"
            onClick={toAddPlanPage}
          />
          <Button
            text="Xóa"
            icon={<MdDelete size={"2rem"} fill="#fff" />}
            className="rounded-[0.4rem] py-0"
          />
        </div>
      </div>
      <div className="border border-t-0 border-border-color pb-[2.5rem] rounded-b-[2.5rem]">
        <table className="w-[100%]">
          <thead className="bg-[#F7F8FA]">
            <tr>
              <th className="py-[1.6rem] text-[1.2rem]">#</th>
              <th className="py-[1.6rem] text-[1.2rem] text-left">
                Tên kế hoạch
              </th>
              <th className="py-[1.6rem] text-[1.2rem] text-left">Địa điểm</th>
              <th className="py-[1.6rem] text-[1.2rem]">Ngày</th>
              <th className="py-[1.6rem] w-[10%] text-[1.2rem]">
                Số lượng nhân viên
              </th>
              <th className="py-[1.6rem] w-[7%] text-[1.2rem]">Bắt đầu</th>
              <th className="py-[1.6rem] w-[7%] text-[1.2rem]">Kết thúc</th>
              <th className="py-[1.6rem] w-[10%] text-[1.2rem]">Ưu tiên</th>
              <th className="py-[1.6rem] w-[10%] text-[1.2rem]">#</th>
            </tr>
          </thead>
          <tbody>
            {DSKeHoach.map(
              ({
                id,
                tenKeHoach,
                diaDiem,
                soNgay,
                soLuongNV,
                ngayBatDau,
                ngayKetThuc,
                doUuTien,
              }) => (
                <tr
                  className="font-semibold border-b border-border-color"
                  key={id}
                >
                  <td className="text-center py-[1.6rem] text-[1.2rem]">
                    <input type="checkbox" className="translate-y-[0.3rem]" />
                  </td>
                  <td className="py-[1.6rem] text-[1.2rem]">{tenKeHoach}</td>
                  <td className="py-[1.6rem] text-[1.2rem] ">{diaDiem}</td>
                  <td className="text-center py-[1.6rem] text-[1.2rem]">
                    {soNgay}
                  </td>
                  <td className="text-center py-[1.6rem] text-[1.2rem]">
                    {soLuongNV}
                  </td>
                  <td className="text-center py-[1.6rem] text-[1.2rem]">
                    {ngayBatDau}
                  </td>
                  <td className="text-center py-[1.6rem] text-[1.2rem]">
                    {ngayKetThuc}
                  </td>
                  <td className="text-center py-[1.6rem] text-[1.2rem]">
                    {<DoUuTien doUuTien={doUuTien} />}
                  </td>
                  <td className="text-center py-[1.6rem] text-[1.2rem]">
                    <button className="ml-1">
                      <MdEdit size={18} />
                    </button>
                    <button className="ml-1">
                      <MdDelete size={18} />
                    </button>
                    <button className="ml-1">
                      <MdRemoveRedEye size={18} />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Plan;
