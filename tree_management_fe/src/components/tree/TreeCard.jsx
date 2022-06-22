import { MdEdit } from "react-icons/md";
import DefaultImg from "../../assets/images/default.jpg";

const TreeCard = ({
  id,
  tenCay,
  viTri,
  hinhAnh,
  onClick = undefined,
  checked,
  handleCheck,
  onEdit,
}) => {
  return (
    <div
      className="bg-white rounded-[2rem] p-[1.2rem] cursor-pointer translate-y-hover group"
      onClick={onClick}
    >
      <div
        style={{ backgroundImage: `url(${hinhAnh || DefaultImg})` }}
        className="relative rounded-[1.2rem] pt-[100%] bg-center bg-no-repeat bg-cover shadow-lg"
      >
        <input
          type="checkbox"
          className="appearance-none cursor-pointer h-[1.8rem] w-[1.8rem] checked:border-2 p-[0.2rem] rounded-full bg-white checked:bg-[#26A0FC] checked:bg-clip-content absolute top-[0.4rem] right-[0.4rem] after:absolute after:top-[50%] after:left-[50%] after:w-[0.8rem] after:h-[0.5rem] after:border-l-2 after:border-b-2 after:rotate-[-45deg] after:border-white after:content-[''] after:block after:translate-x-[-50%] after:translate-y-[-65%]"
          checked={checked}
          onChange={handleCheck(id)}
        />
        <div className="absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100 group-hover:top-[50%] transition-all duration-300">
          <button
            className="p-1 bg-white rounded-full shadow-md "
            onClick={onEdit}
          >
            <MdEdit size={20} />
          </button>
        </div>
      </div>
      <div className="mt-[2.2rem] pb-1 text-center">
        <h2 className="font-semibold text-[1.4rem]">{id}</h2>
        <h2 className="font-semibold text-[1.4rem]">{tenCay}</h2>
        <p className=" text-[1.2rem] mt-[0.4rem]">{viTri}</p>
      </div>
    </div>
  );
};

export default TreeCard;
