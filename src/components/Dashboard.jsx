import CoverList from "./CoverList";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="lg:px-[10%] md:px-[5%] px-[3%] mt-[57px] h-screen py-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Phone Covers List</h1>
        <Link to="/dashboard/newphonecover">
          <Button className="bg-button-background hover:bg-button-background-hover cursor-pointer">
            + Create New
          </Button>
        </Link>
      </div>
      <CoverList />
    </div>
  );
};
export default Dashboard;
