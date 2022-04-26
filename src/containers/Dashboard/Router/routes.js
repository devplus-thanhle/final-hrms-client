import Campaign from "../Campaign/campaign";
import CreateCampaign from "../Campaign/createCampaign";
import React from "react";
import NotFound from "../../404Page";
import ProfieByCampaign from "../Profile/profileByCampaign";

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
    path: "*",
    component: <NotFound />,
  },
];
