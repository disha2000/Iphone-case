import { ImageURL } from "@/utils/config";
import AddToCart from "./common/AddToCart";
import { useNavigate } from "react-router-dom";

const PhoneCoverItem = ({ cover, mref }) => {
  const { imageUrl, id, name, price } = cover;
  const navigate = useNavigate();

  const navigateToPhoneReview = () => {
    navigate(`/phonecases/preview/${id}`);
  };
  return (
    <div
      key={id}
      ref={mref}
      className="md:w-[150px] md:h-[300px] flex flex-col m-auto text-center cursor-pointer"
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
export default PhoneCoverItem;
