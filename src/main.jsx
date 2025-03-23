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
import Cart from "./components/Cart";
import Dashboard from "./components/Dashboard";
import Unauthorized from "./components/Unauthorized";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import BagPage from "./components/BagPage";
import PaymentPage from "./components/PaymentPage";
import NewPhoneCover from "./components/NewPhoneCover";
import PublicRoute from "./components/routes/PublicRoute";
import CoverList from "./components/CoverList";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute checkIsAdmin={true} />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
              {
                index: true,
                element: <CoverList />,
              },
              {
                path: "newphonecover",
                element: <NewPhoneCover />,
              },
            ],
          },
        ],
      },
      {
        path: "/signup",
        element: <PublicRoute/>,
        children: [
          {
            path: '/signup',
            element: <Signup/>
          }
        ]
      },
      {
        path: "/login",
        element: <PublicRoute/>,
        children: [
          {
            path: '/login',
            element: <Login/>
          }
        ]
      },
      {
        path: "/configure",
        element: <Configure />,
        children: [
          {
            path: "/configure",
            element: <CreateCase />,
          },
          {
            path: "/configure/design/:id",
            element: <CustomizeCoverDesign />,
          },
          {
            path: "/configure/preview/:id",
            element: <PhoneReviewPage />,
          },
        ],
      },
      {
        path: "/cart",
        element: <Cart />,
        children: [
          {
            path: "/cart",
            element: <BagPage/>
          },
          {
            path: "/cart/payment",
            element:<ProtectedRoute/>,
            children:[
              {
                path:'/cart/payment',
                element:<PaymentPage/>,
              }
            ]
          }
        ]
      },
      {
        path: '/Unauthorized',
        element:<Unauthorized/>
      }
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
