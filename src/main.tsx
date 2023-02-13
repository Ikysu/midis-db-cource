import React, { useCallback } from 'react'
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
import { Navigator } from './component';

export const Pages = [
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
      <Navigator element={element} index={index} />
    )
  }
}));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
