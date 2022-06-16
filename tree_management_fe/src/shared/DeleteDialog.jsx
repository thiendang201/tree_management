import { MdDelete } from "react-icons/md";

const DeleteDialog = ({ message, handleClose, handleClick }) => {
  return (
    <div className="absolute top-[120%] left-[50%] translate-x-[-50%] shadow-lg bg-white min-w-max rounded-[0.8rem] overflow-hidden">
      <h3 className="text-[1.4rem] font-semibold p-[1.2rem] bg-[#FAFBFD] ">
        Thông báo
      </h3>
      <div className="p-[1.2rem]">
        <p className="text-[1.2] font-medium">{message}</p>
        <div className="flex justify-end gap-1 mt-2">
          <button
            onClick={handleClose}
            className="flex gap-1 items-center rounded-full py-[0.6rem] pl-[1.2rem] pr-[1.2rem] hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 bg-[#FAFBFD] text-[1.2rem] font-semibold"
          >
            Hủy
          </button>
          <button
            onClick={handleClick}
            className="flex gap-[0.6rem] items-center rounded-full py-[0.6rem] pl-[1.2rem] pr-[1.8rem] hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 bg-danger text-white text-[1.2rem] font-semibold"
          >
            <MdDelete size={"1.6rem"} />
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
