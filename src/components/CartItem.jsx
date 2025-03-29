import {
  mobileListConfig,
  finishesConfig,
  materialsConfig,
} from "@/utils/config";
import AddToCart from "./common/AddToCart";
import { Check } from "lucide-react";
import CloseIcon from "./common/CloseIcon";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlice";
import { useEffect } from "react";
import { ImageURL } from "@/utils/config";

const CartItem = ({ cart }) => {
  const {
    imageUrl,
    model,
    price,
    finish,
    material,
    id,
    quantity,
    isCustom,
    name,
  } = cart;
  const dispatch = useDispatch();
  const phoneCaseImage = `${ImageURL}${imageUrl}`;
  const modelName = mobileListConfig[model]?.value || "iPhone";
  const finishName = finishesConfig[finish]?.title || "";
  const materialName = materialsConfig[material]?.title || "";
  const removeItemFromCart = () => {
    dispatch(removeFromCart(id));
  };
  const CustomCover = () => {
    return (
      <div className="flex flex-col justify-items-start gap-y-1.5">
        <h1 className="font-bold text-lg">Your Custom Iphone Case</h1>
        <p className="text-sm font-normal text-gray-700">Model: {modelName} </p>
        <p className="text-sm font-normal text-gray-700">
          Material: {materialName}
        </p>
        <p className="text-sm font-normal text-gray-700">
          Finish: {finishName}
        </p>
        <p className="font-bold text-gray-700">${price}</p>
        <p className="text-xs text-gray-700 font-normal">
          {" "}
          <Check className="inline-block size-5 text-indigo-500 mr-1" />
          Delivery by <span className="font-bold">18 Mar 2025</span>
        </p>
      </div>
    );
  };
  const PhoneCoverM = () => {
    return (
      <div className="flex flex-col justify-items-start gap-y-1.5 w-[50%]">
        <p className="text-sm font-normal text-gray-700">{name} </p>
        <p className="text-sm font-normal text-gray-700">
          Material: {materialName}
        </p>
        <p className="text-sm font-normal text-gray-700">
          Finish: {finishName}
        </p>
        <p className="font-bold text-gray-700">${price}</p>
        <p className="text-xs text-gray-700 font-normal">
          <Check className="inline-block size-5 text-indigo-500 mr-1" />
          Delivery by <span className="font-bold">18 Mar 2025</span>
        </p>
      </div>
    );
  };
  useEffect(() => {
    if (quantity == 0) {
      removeItemFromCart();
    }
  }, [cart.quantity]);
  return (
    <div className="md:w-[90%] flex flex-row justify-evenly items-center p-3.5 rounded-lg border-1 border-gray-200 relative my-1.5">
      <img
        src={phoneCaseImage}
        alt="Phone Image"
        className={`w-[50px] h-[100px] object-cover`}
      />
      {isCustom ? <CustomCover /> : <PhoneCoverM />}
      <AddToCart id={id}></AddToCart>
      <CloseIcon handleOnClick={removeItemFromCart} />
    </div>
  );
};

export default CartItem;
