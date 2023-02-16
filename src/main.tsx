import React, { useCallback } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import {
  Search,
  Favorite,
  Assignment,
  People,
  ShoppingCart,
} from "@mui/icons-material";

import { Navigator } from "./component";
import { ContractList, Client, ClientList, DealerList } from "./routers";

export type Item = {
  icon: JSX.Element;
  element: JSX.Element;
  label: string;
  path: string;
  nav: boolean;
};

export const mainList: Item[] = [
  {
    icon: <Assignment />,
    element: <ContractList />,
    label: "Договора",
    path: "/",
    nav: true,
  },
  {
    icon: <ShoppingCart />,
    element: <DealerList />,
    label: "Дилеры",
    path: "/dealers",
    nav: true,
  },
  {
    icon: <People />,
    element: <ClientList />,
    label: "Клиенты",
    path: "/clients",
    nav: true,
  },
];

const router = createBrowserRouter(
  mainList.map(({ path, element, nav }, index) => {
    return {
      path,
      element: nav ? <Navigator element={element} /> : element,
    };
  })
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
