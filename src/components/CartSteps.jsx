import { CircleDollarSign, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const CartStepts = () => {
  const location = useLocation();
  const [isBag, setIsBag] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  useEffect(() => {
    if (location.pathname.toLowerCase().includes("payment")) {
      setIsBag(false);
      setIsPayment(true);
    } else {
      setIsBag(true);
      setIsPayment(false);
    }
  }, [location.pathname]);
  return (
    <div className="text-sm font-medium text-gray-500 text-center">
      <span
        className={`px-1.5 text-center ${
          isBag ? "text-indigo-500 underline" : ""
        }`}
      >
        <ShoppingBag className={`inline-block size-4 mx-1.5 `} />
        BAG
      </span>
      <span>-------</span>
      <span
        className={`px-1.5 text-center ${
          isPayment ? "text-indigo-500 underline" : ""
        }`}
      >
        <CircleDollarSign className="inline-block size-4  mx-1.5" />
        PAYMENT
      </span>
    </div>
  );
};

export default CartStepts;
