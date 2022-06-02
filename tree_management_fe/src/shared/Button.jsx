const Button = ({
  type = "solid",
  icon = undefined,
  iconPosition = "l",
  text,
  onClick,
}) => {
  if (type === "outline")
    return (
      <button className="flex gap-1 items-center rounded-full p-[0.8rem] pr-[1.8rem] hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 border-2 border-primary text-primary text-[1.2rem] font-semibold">
        {icon}
        {text}
      </button>
    );

  return (
    <button className="flex gap-1 items-center rounded-full p-1 pr-[1.8rem] hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 bg-primary text-white text-[1.2rem] font-semibold">
      {icon}
      {text}
    </button>
  );
};

export default Button;
