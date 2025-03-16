import { useOutletContext } from "react-router-dom";
import CartItems from "./CartItems";
import PriceSection from "./PriceSection";
const BagPage = () => {
  const [carts] = useOutletContext();
  console.log(carts);
  return (
    <div>
      <h1 className="font-bold text-lg"> My bag ({carts?.length} items)</h1>
      <div className="w-full h-full flex md:flex-row flex-col gap-3">
        <CartItems carts={carts} />
        <div className="border-1 md:min-h-screen md:w-0 w-full border-gray-100"></div>
        <PriceSection carts={carts} />
      </div>
    </div>
  );
};
export default BagPage;
