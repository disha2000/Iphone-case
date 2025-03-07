import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="h-14 bg-white/10 border-b-1 border-gray-200 backdrop-blur-3xl fixed w-full flex items-center px-[5%] justify-between z-[100] ">
      <h1 className="text-xl font-semibold">
        <Link to="/">case<span className="text-indigo-600">Indigo</span></Link>
      </h1>
      <ul className="text-sm font-medium">
        <li className="inline-block pr-3">Sign Up</li>
        <li className="inline-block"><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
