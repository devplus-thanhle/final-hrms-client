import React from "react";
import Home from "../containers/HomePage/index";
import Dashboard from "../containers/Dashboard/index";
import NotFound from "../containers/404Page/index";
<<<<<<< HEAD
import Campaign from "../containers/Campaign/index";
=======
import Comingsoon from "../containers/HomePage/comingsoon"
>>>>>>> 90bb910ce2256241567361e1b09e3f0dabb6fa5a
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
    path: "*",
    component: <NotFound />,
  },
  {
    path: "/campaigns/*",
    component: <Campaign />,
  }
];
