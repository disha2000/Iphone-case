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

const CartItem = ({ cart }) => {
  const { imageUrl, model, price, finish, material, id, quantity } = cart;
  console.log(quantity);
  const dispatch = useDispatch();
  const phoneCaseImage = `https://res.cloudinary.com/do2lx5yjd/image/upload/${imageUrl}`;
  const modelName = mobileListConfig[model]?.value || "iPhone";
  const finishName = finishesConfig[finish]?.title || "";
  const materialName = materialsConfig[material]?.title || "";
  const removeItemFromCart = () => {
    dispatch(removeFromCart(id));
  };
  useEffect(() => {
    if (quantity == 0) {
      console.log("here");
      removeItemFromCart();
    }
  }, [cart.quantity]);
  return (
    <div className="flex flex-row justify-evenly items-center p-3.5 rounded-lg border-1 border-gray-200 relative">
      <img
        src={phoneCaseImage}
        alt="Phone Image"
        className="w-[50px] h-[100px]"
      />
      <div className="flex flex-col justify-items-start gap-y-1.5">
        <h1 className="font-bold text-lg">Your Custom Iphone Case</h1>
        <p className="text-sm font-normal text-gray-700">Model: {modelName} </p>
        <p className="text-sm font-normal text-gray-700">
          Material: {materialName}{" "}
        </p>
        <p className="text-sm font-normal text-gray-700">
          Finish: {finishName}{" "}
        </p>
        <p className="font-bold text-gray-700">${price}</p>
        <p className="text-xs text-gray-700 font-normal">
          {" "}
          <Check className="inline-block size-5 text-indigo-500 mr-1" />
          Delivery by <span className="font-bold">18 Mar 2025</span>
        </p>
      </div>
      <AddToCart id={id}></AddToCart>
      <CloseIcon handleOnClick={removeItemFromCart} />
    </div>
  );
};

export default CartItem;
