import { ImArrowRight2 } from "react-icons/im";
import FluentTaskListSquareLtr24Filled from "../../assets/icons/FluentTaskListSquareLtr24Filled";
import { buttonColor } from "../../config";
import Button from "../../shared/Button";

const AddPlan = () => {
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
      </div>
      <div className="grid grid-cols-3 border border-border-color p-1 border-t-0 rounded-b-[2.5rem]">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default AddPlan;
