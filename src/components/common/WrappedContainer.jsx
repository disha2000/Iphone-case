const WrappedContainer = ({ children, className }) => {
  console.log(children);
  return (
    <div className={`min-h-[calc(100vh-120px)] flex flex-col w-full ${className || ""}`}>
      {children}
    </div>
  );
};
export default WrappedContainer;


