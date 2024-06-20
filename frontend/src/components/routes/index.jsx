import { useRoutes } from "react-router-dom";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Signin from "../../pages/Signin";

const MainRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
  ]);
  return routes;
};

export default MainRoutes;
