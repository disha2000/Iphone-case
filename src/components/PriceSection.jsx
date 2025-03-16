import { useMemo } from "react";
import { Button } from "./ui/button";

const PriceSection = ({ carts }) => {
  const calculatePrice = useMemo(() => {
    const totalPrice = carts.reduce((price, cart) => {
      price = price + cart.quantity * cart.price;
      return price;
    }, 0);
    return totalPrice;
  }, [carts]);

  return (
    <div className="w-full md:w-[40%] lg:w-[30%] my-8 px-2">
      <h1>Price Details (1 Item)</h1>
      <div className="text-sm font-normal text-gray-500 flex flex-row justify-between my-2.5">
        <p>Total MRP</p>
        <p>${calculatePrice}</p>
      </div>
      <div className="text-sm font-normal text-gray-500 flex flex-row justify-between my-2.5">
        <p>Shipping Fee</p>
        <p className="text-green-400">FREE</p>
      </div>
      <div className="border-1 border-gray-100 w-full"></div>
      <div className="text-base font-bold text-black flex flex-row justify-between my-2.5">
        <p>Total Amount</p>
        <p>${calculatePrice}</p>
      </div>
      <Link to="/cart/payment">
        <Button className="mt-2 bg-button-background hover:bg-button-background-hover w-full cursor-pointer">
          PLACE ORDER
        </Button>
      </Link>
    </div>
  );
};
export default PriceSection;
