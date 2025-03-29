export const outOfOrderPhoneCase = (Component) => {
  return function WrappedComponent(props) {
    return (
      <div className="relative">
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1 text-indigo-500 border border-gray-300 font-normal">
          OUT OF STOCK
        </p>
        <Component {...props} disabled={true} />
      </div>
    );
  };
};
