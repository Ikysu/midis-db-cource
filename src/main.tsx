import React, { useCallback } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom";
import {
  Search,
  Favorite
} from "@mui/icons-material";

import { Navigator } from './component';
import { Finder, Favorites, Client } from './routers';

export const Pages = [
  {
    label:"Поиск",
    icon: <Search />,
    path: "/",
    element: <Finder />,
    nav: true
  },
  {
    label:"Избранное",
    icon: <Favorite />,
    path: "/fav",
    element: <Favorites />,
    nav: true
  },
  {
    label:"Client",
    path: "/client/:client_id",
    element: <Client />
  }
]

const router = createBrowserRouter(Pages.map(({path, element, nav}, index)=>{
  return {
    path,
    element: nav ? (
      <Navigator element={element} index={index} />
    ) : element
  }
}));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
