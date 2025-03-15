const CloseIcon = ({handleOnClick}) => {
  return (
    <div className="absolute rotate-162 right-5 top-0 cursor-pointer" onClick={handleOnClick}>
      <div className="w-0.5 bg-gray-500 h-3.5 rotate-56"></div>
      <div className="w-0.5 bg-gray-500 h-3.5 -rotate-200 -translate-y-3.5"></div>
    </div>
  );
};
export default CloseIcon;
