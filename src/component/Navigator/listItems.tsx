import {
  Dashboard,
  ShoppingCart,
  People,
  BarChart,
  Layers,
  Assignment,
} from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Item } from "../../main";

export function listItems(items: Item[], navigate: NavigateFunction) {
  return (
    <React.Fragment>
      {items.map(({ icon, label, path }: Item) => {
        return (
          <ListItemButton
            onClick={() => {
              navigate(path);
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        );
      })}
    </React.Fragment>
  );
}
