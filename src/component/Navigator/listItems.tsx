import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Item } from "../../main";

export function listItems(items: Item[], navigate: NavigateFunction) {
  return (
    <>
      {items.map(({ icon, label, children }: Item) => {
        return (
          <ListItemButton
            onClick={() => {
              navigate(children[0].path);
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        );
      })}
    </>
  );
}
