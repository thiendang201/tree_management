import { format } from "date-fns";
import { capitalize } from "../../utils/capitalizeString";
import DoUuTien from "../DoUuTien";
import DefaultAvt from "../../assets/images/default-avatar.png";

const PlanItem = ({
  id,
  index,
  tenKeHoach,
  moTa,
  diaDiem,
  ngayBatDau,
  ngayKetThuc,
  doUuTien,
  nhanVien,
  hinhAnhNV,
  staffs,
}) => {
  const [y_s, m_s, d_s] = ngayBatDau.split("-");
  const [y_e, m_e, d_e] = ngayKetThuc.split("-");
  return (
    <div className="grid grid-cols-[20%_80%] gap-1 bg-[#FAFBFD] rounded-[0.6rem] mt-1">
      <div className="m-1 relative">
        <div className="absolute top-1 left-1 text-[1.2rem] font-semibold">
          {index}
        </div>
        <div className="m-[3rem] mb-1">
          <div
            style={{ backgroundImage: `url(${hinhAnhNV || DefaultAvt})` }}
            className="relative rounded-full pt-[100%] bg-center bg-no-repeat bg-cover shadow-lg bg-black"
          ></div>
        </div>
        <h3 className="text-center text-[1.2rem] font-semibold">
          {capitalize(nhanVien)}
        </h3>
        <p className="text-center font-medium">Người phụ trách</p>
      </div>
      <div>
        <h2 className="mt-4 font-semibold text-[2rem]">{tenKeHoach}</h2>
        <p className="font-medium text-[1.2rem] opacity-80">{moTa}</p>
        <p className="font-medium text-[1.2rem] mt-1">
          {format(new Date(y_s, m_s - 1, d_s), "dd/MM/yyyy") +
            " - " +
            format(new Date(y_e, m_e - 1, d_e), "dd/MM/yyyy")}
        </p>
        <p className="font-medium text-[1.2rem]">{diaDiem}</p>
        <div className="flex py-1">
          {staffs.map(({ id, tenNV, hinhAnh }, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${hinhAnh || DefaultAvt})`,
                transform: `translateX(-${index * 30}%)`,
              }}
              className="rounded-full w-[3.5rem] h-[3.5rem] bg-center bg-no-repeat bg-cover bg-black border-2 border-white"
            ></div>
          ))}
        </div>
        <div className="flex pb-2">
          <DoUuTien doUuTien={doUuTien} />
        </div>
      </div>
    </div>
  );
};

export default PlanItem;
