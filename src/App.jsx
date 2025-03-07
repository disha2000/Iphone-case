import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import store from "./store/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col justify-between  min-h-[100vh]">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
