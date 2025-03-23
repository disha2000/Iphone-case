import { Link } from "react-router-dom";

const DashboardNav = () => {

    return <nav className="h-[55px] flex flex-row justify-between w-full bg-indigo-400 text-white items-center px-[5%] drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
    <div className="font-medium"><Link to="/dashboard">PRODUCTS</Link></div>
    <div className="font-medium">
      <Link to="/dashboard/newphonecover">ADD PRODUCT</Link>
    </div>
    <div className="font-medium">ORDERS</div>
  </nav>
}

export default DashboardNav