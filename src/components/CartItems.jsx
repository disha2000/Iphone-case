import { MoveLeft } from "lucide-react";
import CartItem from "./CartItem";
import { Button } from "./ui/button";

const CartItems = ({ carts }) => {
  return (
    <div className="my-8 lg:w-[70%] w-full">
      {carts?.map((cart) => {
        return <CartItem cart={cart} key={cart.id} />
      })}
      <Button className="mt-5 font-normal bg-white text-black cursor-pointer border-1 border-gray-500 hover:bg-black hover:text-white rounded-sm"><MoveLeft className="inline-block size-5"/>CONTINUE SHOPPING</Button>
    </div>
  );
};
export default CartItems;
