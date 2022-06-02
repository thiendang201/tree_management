import { GoKebabVertical } from "react-icons/go";

const TypeOfTree = ({ id, name, ratio, color }) => {
  return (
    <tr className="font-semibold">
      <td className="text-center py-1 text-[1.2rem]">#{id}</td>
      <td className="py-1 text-[1.2rem]">{name}</td>
      <td className="text-center py-1">
        <span
          className="rounded-[0.4rem] p-[0.4rem] text-white min-w-[4rem] inline-block"
          style={{ backgroundColor: color }}
        >
          {ratio.toFixed(1)}%
        </span>
      </td>
      <td className="text-center py-1">
        <button>
          <GoKebabVertical />
        </button>
      </td>
    </tr>
  );
};

export default TypeOfTree;
