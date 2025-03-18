import { Outlet, useLocation } from "react-router-dom";
import Steps from "./Steps";
import { activeTab } from "./context/activateTab";
import { useState, useEffect } from "react";
import WrappedContainer from "./common/WrappedContainer";

const Configure = () => {
  const location = useLocation();
  const [activeTabState, setActiveTabState] = useState(0);

  useEffect(() => {
    if (location.pathname.toLowerCase().includes("design")) {
      setActiveTabState(1);
    } else if (location.pathname.toLowerCase().includes("preview")) {
      setActiveTabState(2);
    } else {
      setActiveTabState(0);
    }
  }, [location.pathname]);

  return (
    <activeTab.Provider value={{ active: activeTabState }}>
      <WrappedContainer className="lg:px-[10%] md:px-[5%] px-[3%] mt-[57px]">
        <Steps />
        <Outlet />
      </WrappedContainer>
    </activeTab.Provider>
  );
};

export default Configure;
