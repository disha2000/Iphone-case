import CartStepts from "./CartSteps";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Link, Outlet } from "react-router-dom";
import EmptyCart from "./EmptyCart";
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
       <EmptyCart/>
      )}
    </div>
  );
};
export default Cart;
