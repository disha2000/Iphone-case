import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import WrappedContainer from "./common/WrappedContainer";

const EmptyCart = () => {
    return (
      <div className="flex flex-col items-center justify-center text-lg/10">
        <img src="/Empty Cart 2.svg" className="size-90" />
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