import { lazy } from "react";

const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Home = lazy(() => import("../pages/Home/Home"));

const routes = {
  public: [
    { path: "/login", element: Login },
    { path: "/register", element: Register }
  ],
  private: [
    { path: "/home", element: Home }
  ]
};

export default routes;