import { AiFillStar } from "react-icons/ai";

const DoUuTien = ({ size = 20, doUuTien = 0 }) => {
  const fillStarList = new Array(doUuTien).fill(
    <AiFillStar size={size} fill="#6926D7" />
  );
  const starList = new Array(5 - doUuTien).fill(
    <AiFillStar size={size} fill="#EEE3FF" />
  );
  return (
    <ul className="flex gap-[0.2rem] justify-center">
      {[...fillStarList, ...starList].map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default DoUuTien;
