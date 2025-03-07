import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (

    <div className="flex flex-col justify-between  min-h-[100vh]">
        <Navbar />
        <Outlet />
        <Footer />
    </div>

  );
}

export default App;
