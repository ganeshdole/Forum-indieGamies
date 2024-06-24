import { useRoutes } from "react-router-dom";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import MainLayout from "../Layout/MainLayout";
import Categories from "../../pages/Categories";
import Threads from "../../pages/Threads";
import NotFound from "../../pages/NotFound";


const MainRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/category/:categoryId", element: < Categories />, },
        { path: "/thread/:threadId", element: < Threads />, },
        { path: "*", element: <NotFound /> }
      ]
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return routes;
};

export default MainRoutes;
