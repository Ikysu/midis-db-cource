import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Assignment, People, ShoppingCart } from "@mui/icons-material";

import { Navigator } from "./component";
import {
  ContractList,
  Client,
  ClientList,
  DealerList,
  Dealer,
  Contract,
} from "./routers";
import { createTheme, ThemeProvider } from "@mui/material";

export type Item = {
  icon: JSX.Element;
  label: string;
  children: any;
};

export const mainList: Item[] = [
  {
    icon: <Assignment />,
    label: "Контракты",
    children: [
      {
        index: true,
        element: <Navigator element={<ContractList />} title={"Контракты"} />,
        path: "/",
      },
      {
        path: "/contract/:contract_id",
        element: <Navigator element={<Contract />} title={"Контракт"} />,
      },
    ],
  },
  {
    icon: <ShoppingCart />,
    label: "Дилеры",
    children: [
      {
        index: true,
        element: <Navigator element={<DealerList />} title={"Дилеры"} />,
        path: "/dealers",
      },
      {
        path: "/dealer/:dealer_id",
        element: <Navigator element={<Dealer />} title={"Дилер"} />,
      },
    ],
  },
  {
    icon: <People />,
    label: "Клиенты",
    children: [
      {
        index: true,
        element: <Navigator element={<ClientList />} title={"Клиенты"} />,
        path: "/clients",
      },
      {
        path: "/client/:client_id",
        element: <Navigator element={<Client />} title={"Клиент"} />,
      },
    ],
  },
];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter(mainList);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={darkTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
