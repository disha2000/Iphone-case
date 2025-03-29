import { useEffect, useMemo, useState } from "react";
import { addToCart, updateCart } from "@/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AddToCart = ({ data = {}, id }) => {
  const { finish, material, imageUrl, model, price, isCustom, name } = data;
  console.log(data);
  const dispatch = useDispatch();
  const carts = useSelector((store) => store.cart.carts);
  const existedCartItem = useMemo(() => {
    const data = carts?.find((cart) => cart.id === id);
    return data;
  }, [carts, id]);
  const [count, setCount] = useState(existedCartItem?.quantity || 0);

  useEffect(() => {
    const dispatchRequest = () => {
      const updatedConfig = {
        id: id,
        name: name,
        quantity: count,
        model: model,
        price: price,
        imageUrl: imageUrl,
        material: material,
        finish: finish,
        isCustom: isCustom,
      };
      if (!existedCartItem) {
        dispatch(addToCart(updatedConfig));
      } else {
        dispatch(updateCart(updatedConfig));
      }
    };
    if (count > 0 || existedCartItem) {
      dispatchRequest();
    }
  }, [count]);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const handleDerement = () => {
    setCount((prev) => prev - 1);
  };
  return (
    <div className=" rounded-md w-[120px] h-[35px] float-end text-sm bg-white flex flex-row items-center cursor-pointer text-black border-1 border-gray-300">
      {count === 0 ? (
        <div
          className="w-full h-full  py-2 flex flex-row justify-center items-center cursor-pointer"
          onClick={handleIncrement}
        >
          ADD TO CART
        </div>
      ) : (
        <div className="grid grid-cols-3 h-full w-full text-center items-center">
          <span
            className="text-base font-medium hover:none cursor-pointer"
            onClick={handleDerement}
          >
            -
          </span>
          <span className="text-base font-medium cursor-pointer">{count}</span>
          <span
            className="text-base font-medium cursor-pointer"
            onClick={handleIncrement}
          >
            +
          </span>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
