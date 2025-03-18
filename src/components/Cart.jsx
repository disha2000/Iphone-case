import CartSteps from "./CartSteps";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import WrappedContainer from "./common/WrappedContainer";

const Cart = () => {
  const carts = useSelector((store) => store.cart.carts);

  return (
    <WrappedContainer className="lg:px-[10%] md:px-[5%] px-[3%] mt-[57px]">
      {carts?.length > 0 ? (
        <div className="py-3">
          <CartSteps />
          <Outlet context={[carts]} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </WrappedContainer>
  );
};

export default Cart;
