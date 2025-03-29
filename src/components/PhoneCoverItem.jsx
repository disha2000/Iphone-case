import { ImageURL } from "@/utils/config";
import AddToCart from "./common/AddToCart";
import { useNavigate } from "react-router-dom";

const PhoneCoverItem = ({ cover, mref, disabled }) => {
  const { imageUrl, id, name, price } = cover;
  const navigate = useNavigate();

  const navigateToPhoneReview = () => {
    navigate(`/phonecases/preview/${id}`);
  };
  return (
    <div
      key={id}
      ref={mref}
      className={`md:w-[200px] md:h-[300px] flex flex-col m-auto text-center cursor-pointer ${
        disabled ? "bg-gray-50 !cursor-none" : ""
      }`}
      onClick={navigateToPhoneReview}
    >
      <img
        src={`${ImageURL}${imageUrl}`}
        className="!h-[200px] !w-[100px] object-cover m-auto"
      />
      <p className="text-sm my-1.5 font-normal text-gray-600">{name}</p>
      <p className="my-1.5 font-bold text-black">${price}</p>

      <div className="m-auto">
        <AddToCart key={id + "cart"} id={id} data={cover} />
      </div>
    </div>
  );
};

export const outOfOrderPhoneCase = (Component) => {
  console.log("here");
  return function WrappedComponent(props) {
    console.log("here1");
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

export default PhoneCoverItem;
