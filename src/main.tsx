import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom";

import { useState } from "react";

import { Index } from './routers';
import {
  Search,
  Favorite
} from "@mui/icons-material";
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';

const Pages = [
  {
    label:"Поиск",
    icon: <Search />,
    path: "/",
    element: <Index />
  },
  {
    label:"Избранное",
    icon: <Favorite />,
    path: "/fav",
    element: <Index />
  }
]



const router = createBrowserRouter(Pages.map(({path, element}, index)=>{
  return {
    path,
    element: (
      <div>
        {element}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
          showLabels
          value={index}
          onChange={(event, newValue)=>{
            const navigate = useNavigate();
            navigate(Pages[newValue].path, {replace: true});
          }}
        >
          {Pages.map(({label, icon})=>{
            return (
              <BottomNavigationAction label={label} icon={icon} />
            )
          })}
        </BottomNavigation>
        </Paper>
      </div>
    )
  }
}));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
