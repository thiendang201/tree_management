const TreeCard = ({ id, name, location, img, onClick = undefined }) => {
  return (
    <div
      className="bg-white rounded-[2rem] p-[1.2rem] cursor-pointer translate-y-hover"
      onClick={onClick}
    >
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="rounded-[1.2rem] pt-[100%] bg-center bg-no-repeat bg-cover shadow-lg"
      ></div>
      <div className="mt-[2.2rem] pb-1 text-center">
        <h2 className="font-semibold text-[1.4rem]">#{id}</h2>
        <h2 className="font-semibold text-[1.4rem]">{name}</h2>
        <p className=" text-[1.2rem] mt-[0.4rem]">{location}</p>
      </div>
    </div>
  );
};

export default TreeCard;
