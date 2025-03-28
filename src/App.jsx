import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Toaster} from 'sonner'
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/slices/userSlice";

function App() {
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
    return () =>{
      unsubscribe();
    }
  }, []);

  return (
    <div className="flex flex-col justify-between  min-h-[100vh]">
      <Toaster  closeButton/>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
