const BoxOutline = ({
    title,
    description,
    price,
    handleOnClick,
    index,
    selectedIndex,
    name
  }) => {
    return (
      <div
        className={`my-3 p-3 mx-1 ${
          index === selectedIndex ? "border-indigo-500" : "border-gray-200"
        } border-2 border-gray-200 flex flex-row w-full justify-between text-[13px] rounded-lg cursor-pointer`}
        onClick={() => handleOnClick(index, name)}
      >
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-gray-400">{description}</p>
        </div>
        <p className="font-bold">${price.toFixed(2)}</p>
      </div>
    );
  };

  export default BoxOutline;