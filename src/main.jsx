import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from './components/Signup.jsx';


const routerConfig = createBrowserRouter([
  {
    path: "/",
    element:<App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routerConfig}>
    </RouterProvider>
)
