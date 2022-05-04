import React from "react";
import Home from "../containers/HomePage/index";
import LogIn from "../containers/LogIn/LogIn";
import Dashboard from "../containers/Dashboard/index";
import NotFound from "../containers/404Page/index";
import Campaign from "../containers/Campaign/index";
import Comingsoon from "../containers/HomePage/comingsoon";
import ForgotPassword from "../containers/LogIn/ForgotPassword";
import ChangePassword from "../containers/LogIn/ChangePassword";

export const routes = [
  {
    indexx: true,
    component: <Home />,
  },
  {
    path: "/comingsoon",
    component: <Comingsoon />,
  },
  {
    path: "/dashboard/*",
    component: <Dashboard />,
  },
  {
    path: "/login",
    component: <LogIn />,
  },
  {
    path: "/forgot-password",
    component: <ForgotPassword />,
  },
  {
    path: "/reset-password/:id",
    component: <ChangePassword />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
  {
    path: "/campaigns/*",
    component: <Campaign />,
  },
];
