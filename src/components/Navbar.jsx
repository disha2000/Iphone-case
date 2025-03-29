import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSignoutMutation } from "../store/services/auth";
import { persistor } from "../store/appStore";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { totalCartItemCount } from "@/utils/helpers";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const [signout] = useSignoutMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCart, setIsCart] = useState(false);
  const carts = useSelector((store) => store.cart.carts);
  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;
  useEffect(() => {
    if (location.pathname.toLowerCase().includes("cart")) {
      setIsCart(true);
    } else {
      setIsCart(false);
    }
  }, [location.pathname]);
  const handleSignOut = async () => {
    await signout().then(() => {
      persistor.flush();
    });
    navigate("/");
  };
  const totalCartItems = totalCartItemCount(carts)
  return (
    <nav className="h-14 bg-white/10 border-b-1 border-gray-200 backdrop-blur-3xl fixed w-full flex items-center px-[5%] justify-between z-[100] ">
      <h1 className="text-xl font-semibold">
        <Link to="/">
          case<span className="text-indigo-600">Indigo</span>
        </Link>
      </h1>
      <ul className="text-sm font-medium flex h-full items-center justify-between">
        {!isCart ? (
          <>
            {!isAdmin && (
              <>
                <li className="pr-3">
                  <Link to="/phonecases">Phone cases</Link>
                </li>
                <li className="pr-3">
                  <Link to="/configure">
                      Create Case
                  </Link>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="inline-block pr-3">
                  <Link to="/signup">Sign up</Link>
                </li>
                <li className="inline-block">
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <li className="inline-block pr-3">
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}

            {!isAdmin && (
              <li className="inline-block px-3">
                <Link to="/cart">Cart ({totalCartItems})</Link>
              </li>
            )}
            {user && (
              <li className="inline-block">
                <button
                  className=" cursor-pointer"
                  onClick={() => handleSignOut()}
                >
                  SignOut
                </button>
              </li>
            )}
          </>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
