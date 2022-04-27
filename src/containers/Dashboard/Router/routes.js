import Campaign from "../Campaign/campaign";
import CreateCampaign from "../Campaign/createCampaign";
import React from "react";
import NotFound from "../../404Page";
import ProfieByCampaign from "../Profile/profileByCampaign";
import Profile from "../Profile/profile";
import DetailProfile from "../Profile/detailProfile";
import Statistic from "../Statistic/statistic";
export const routes = [
  {
    path: "/campaign",
    component: <Campaign />,
  },
  {
    path: "/campaign/create",
    component: <CreateCampaign />,
  },
  {
    path: "/campaign/:id/profile",
    component: <ProfieByCampaign />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/profile/:id",
    component: <DetailProfile />,
  },
  {
    path: "/",
    component: <Statistic />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];
