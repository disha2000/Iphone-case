import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/slices/userSlice";
import sortContext from "./components/context/sortContext";
import { filterContext } from "./components/context/filterContext";

function App() {
  const [currentSelectedSort, setCurrentSelectedSort] = useState(0);
  const [isInStockCheck, setIsInStockCheck] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col justify-between  min-h-[100vh]">
      <sortContext.Provider
        value={{ sortIndex: currentSelectedSort, setCurrentSelectedSort }}
      >
        <filterContext.Provider
          value={{ isOutOfStockCheck: isInStockCheck, setIsInStockCheck }}
        >
          <Toaster closeButton />
          <Navbar />
          <Outlet />
          <Footer />
        </filterContext.Provider>
      </sortContext.Provider>
    </div>
  );
}

export default App;
