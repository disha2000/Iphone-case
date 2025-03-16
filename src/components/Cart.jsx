import CartStepts from "./CartSteps";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Link, Outlet } from "react-router-dom";

const Cart = () => {
  const carts = useSelector((store) => store.cart.carts);
  return (
    <div className="lg:px-[10%] md:px-[5%] px-[3%] mt-[57px] min-h-screen">
      {carts?.length > 0 ? (
        <div className="py-3">
          <CartStepts />
          <Outlet context={[carts]}/>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center text-lg/10">
          <img src="/empty-cart.svg" className="size-56" />
          <h1 className="font-bold">Hey, your bag feels so light!</h1>
          <p className="font-medium">Let’s add some items in your bag</p>
          <Link to="/">
            <Button className="bg-button-background hover:bg-button-background-hover cursor-pointer">
              START SHOPPING
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Cart;
