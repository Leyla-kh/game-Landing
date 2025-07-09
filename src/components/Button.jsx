const Button = ({ title, rightIcon, leftIcon, containerClass, id }) => {
  return (
    <button
      className={`rounded-full px-7 py-3 z-10 w-fit cursor-pointer overflow-hidden group text-black
        relative  ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase ">
        {title}
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
