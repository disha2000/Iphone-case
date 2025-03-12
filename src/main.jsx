import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store, { persistor } from "./store/appStore";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup.jsx";
import { PersistGate } from "redux-persist/integration/react";
import CreateCase from "./components/CreateCase";
import Configure from "./components/Configure";
import CustomizeCoverDesign from "./components/CustomizeCoverDesign";
import PhoneReviewPage from "./components/PhoneReviewPage";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/configure",
        element: <Configure />,
        children: [
          {
            path: "/configure",
            element: <CreateCase />
          },
          {
            path: '/configure/design/:id',
            element: <CustomizeCoverDesign/>
          },
          {
            path:'/configure/preview/:id',
            element: <PhoneReviewPage/>
          }
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate oading={null} persistor={persistor}>
      <RouterProvider router={routerConfig}></RouterProvider>
    </PersistGate>
  </Provider>
);
