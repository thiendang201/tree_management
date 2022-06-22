import { format } from "date-fns";
import { TiDelete } from "react-icons/ti";
import { buttonColor } from "../../config";

const Pest = ({
  id,
  tenBenh,
  moTa,
  mucDo,
  ngayPhatBenh,
  ngayHet = "",
  onRemove,
}) => {
  let ngayBi = "";
  let het = "";
  let mucDoClass = {
    textColor: "text-[#6D88D2]",
    bgColor: "bg-[#EFF2F7]",
  };

  if (mucDo === "2") {
    mucDoClass.textColor = "text-[#F2C00D]";
    mucDoClass.bgColor = "bg-[#FBF8E9]";
  }

  if (mucDo === "3") {
    mucDoClass.textColor = "text-[#D6538C]";
    mucDoClass.bgColor = "bg-[#FBECE9]";
  }

  const mucDoText = "before:content-['Nhẹ']";
  if (mucDo === "2") mucDoText = "before:content-['Vừa']";
  if (mucDo === "3") mucDoText = "before:content-['Nặng']";

  if (typeof ngayPhatBenh === "string") {
    const [yb, mb, db] = ngayPhatBenh.split("-");
    ngayBi = format(new Date(yb, mb - 1, db), "dd/MM/yyyy");
  } else {
    ngayBi = format(ngayPhatBenh, "dd/MM/yyyy");
  }

  if (typeof ngayHet === "string" && ngayHet) {
    const [yk, mk, dk] = ngayHet.split("-");
    het = format(new Date(yk, mk - 1, dk), "dd/MM/yyyy");
  } else if (ngayHet !== null) {
    het = format(ngayHet, "dd/MM/yyyy");
  }

  return (
    <div className="p-2 bg-[#FAFBFD] rounded-[0.6rem] grid grid-cols-[20%_80%] relative">
      <div className="flex justify-center">
        <div
          className={`w-[10rem] h-[10rem] ${mucDoClass.textColor} ${mucDoClass.bgColor} rounded-full relative ${mucDoText} before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] text-[1.4rem] font-semibold`}
        ></div>
      </div>
      <div className="mt-2">
        <h3 className="text-[1.4rem] font-semibold">{tenBenh}</h3>
        <p className="font-medium text-[1.2rem] opacity-70">{moTa}</p>
        <p className="font-medium text-[1.2rem] opacity-70">
          {ngayBi}
          {ngayHet ? " - " + het : " đến nay"}
        </p>
      </div>
      <div className="absolute top-1 right-1">
        <button onClick={onRemove}>
          <TiDelete size={28} fill={buttonColor} />
        </button>
      </div>
    </div>
  );
};

export default Pest;
