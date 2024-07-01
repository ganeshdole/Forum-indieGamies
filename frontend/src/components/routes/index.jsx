import { useRoutes } from "react-router-dom";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import MainLayout from "../Layout/MainLayout";
import Categories from "../../pages/Categories";
import Threads from "../../pages/Thread/Threads";
import NotFound from "../../pages/NotFound";
import PostThread from "../../pages/Thread/PostThread";
import About from "../../pages/About";
import Contact from "../../pages/Contact";

const MainRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "category/:categoryId", element: <Categories /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        {
          path: "thread",
          children: [
            { path: ":threadId", element: <Threads /> }, // Remove leading slash
            { path: "new", element: <PostThread /> }, // Remove leading slash
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
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
