import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import WrappedContainer from "./common/WrappedContainer";

const Dashboard = () => {
  return (
    <WrappedContainer className="mt-[55px]">
      <DashboardNav/>
      <Outlet />
    </WrappedContainer>

  );
};
export default Dashboard;
