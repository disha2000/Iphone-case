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
    >
      <img
        src={`${ImageURL}${imageUrl}`}
        className="!h-[200px] !w-[100px] object-cover m-auto"
        onClick={navigateToPhoneReview}

      />
      <p className="text-sm my-1.5 font-normal text-gray-600">{name}</p>
      <p className="my-1.5 font-bold text-black">${price}</p>
      <div className="m-auto">
        <AddToCart key={id + "cart"} id={id} data={cover} isListView={true}/>
      </div>
    </div>
  );
};

export default PhoneCoverItem;
