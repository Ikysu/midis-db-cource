import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import {
  Search,
  Favorite
} from "@mui/icons-material";
import { useState } from "react";
import "./style.module.css";
import React from "react";

const Pages = [
  {
    label:"Поиск",
    href: "/",
    icon: <Search />
  },
  {
    label:"Избранное",
    href: "/fav",
    icon: <Favorite />
  }
]

export function Index() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(Pages[newValue])
    setValue(newValue);
  };
  return (
    <div className="Index">
      <h1>Vite + React</h1>
      Профиль клиента со списком продоваемых авто<br/>
      Профиль дилера со списком договоров и клиентов<br/>
      Поиск<br/>
      
      
      
    </div>
  );
}

export default Index;
