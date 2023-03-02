import {
  Drawer,
  Divider,
  List,
  Toolbar,
  Box,
  AppBar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { mainList } from "../../main";
import { listItems } from "./listItems";

const drawerWidth = 240;

export function Navigator({
  element,
  title,
}: {
  element: JSX.Element;
  title: string;
}) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List component="nav">
            {listItems(mainList, navigate)}
            <Divider sx={{ my: 1 }} />
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {element}
      </Box>
    </Box>
  );
}

export default Navigator;
