const Button = ({
  type = "solid",
  icon = undefined,
  text,
  onClick,
  className,
}) => {
  if (type === "outline")
    return (
      <button
        onClick={onClick}
        className={`flex gap-1 items-center rounded-full p-[0.8rem] pr-[1.8rem] hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 border-2 border-primary text-primary text-[1.2rem] font-semibold ${className}`}
      >
        {icon}
        {text}
      </button>
    );
  if (type === "disable")
    return (
      <div className="flex gap-1 items-center justify-center rounded-full p-1 pr-[1.8rem] bg-disabled text-white text-[1.2rem] font-semibold min-w-[10rem]">
        {icon}
        {text}
      </div>
    );

  return (
    <button
      onClick={onClick}
      className={`flex gap-1 items-center justify-center rounded-full p-1 pr-[1.8rem] hover:shadow-md hover:translate-y-[-0.1rem] transition-all duration-300 bg-primary text-white text-[1.2rem] font-semibold min-w-[10rem]  ${className}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
