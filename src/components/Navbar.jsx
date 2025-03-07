import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSignoutMutation } from "../store/services/auth";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [signout, { error }] = useSignoutMutation();
  console.log(user);
  const handleSignOut = async () => {
    await signout();
  };
  return (
    <nav className="h-14 bg-white/10 border-b-1 border-gray-200 backdrop-blur-3xl fixed w-full flex items-center px-[5%] justify-between z-[100] ">
      <h1 className="text-xl font-semibold">
        <Link to="/">
          case<span className="text-indigo-600">Indigo</span>
        </Link>
      </h1>
      <ul className="text-sm font-medium">
        {!user && (
          <li className="inline-block pr-3">
            <Link to="/signup">Sign up</Link>
          </li>
        )}
        {!user && (
          <li className="inline-block">
            <Link to="/login">Login</Link>
          </li>
        )}
        {user && (
          <li className="inline-block">
            <button onClick={() => handleSignOut()}>SignOut</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
