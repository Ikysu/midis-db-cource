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
import { Finder, Favorites } from './routers';

export const Pages = [
  {
    label:"Поиск",
    icon: <Search />,
    path: "/",
    element: <Finder />
  },
  {
    label:"Избранное",
    icon: <Favorite />,
    path: "/fav",
    element: <Favorites />
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
