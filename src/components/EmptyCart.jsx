import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="h-[100vh] w-full flex flex-col items-center justify-center text-lg/10">
        <img src="/empty-cart.svg" className="size-56" />
        <h1 className="font-bold">Hey, your bag feels so light!</h1>
        <p className="font-medium">Let’s add some items in your bag</p>
        <Link to="/">
          <Button className="bg-button-background hover:bg-button-background-hover cursor-pointer">
            START SHOPPING
          </Button>
        </Link>
      </div>
    )
}
export default EmptyCart;