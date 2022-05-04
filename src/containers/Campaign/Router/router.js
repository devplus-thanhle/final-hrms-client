import React from 'react'
import Campaign from '../Component/Campaign';
import ApplyCV from '../Component/applyCV';
import ViewDetail from '../Component/viewDetailCampaign'
export const router = [
    {
        path: "/apply/:id",
        component: <ApplyCV />,
    },
    {
        path: "/",
        component: <Campaign />,
    },
    {
        path: "/detail/:id",
        component: <ViewDetail />,
    }
]