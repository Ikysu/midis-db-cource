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
import "./App.css";
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

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(Pages[newValue])
    setValue(newValue);
  };
  return (
    <div className="App">
      <h1>Vite + React</h1>
      Профиль клиента со списком продоваемых авто<br/>
      Профиль дилера со списком договоров и клиентов<br/>
      Поиск<br/>
      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        {Pages.map(({label, icon})=>{
          return (
            <BottomNavigationAction label={label} icon={icon} />
          )
        })}
      </BottomNavigation>
      </Paper>
      
    </div>
  );
}

export default App;
