import { Copyright } from "@mui/icons-material";
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Divider,
  IconButton,
  List,
  Toolbar,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { mainList } from "../../main";
import { listItems } from "./listItems";

export function Navigator({
  index,
  element,
}: {
  index: number;
  element: JSX.Element;
}) {
  const navigate = useNavigate();

  return (
    <div className={`page-${index}`}>
      <Drawer variant="permanent">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        ></Toolbar>
        <Divider />
        <List component="nav">
          {listItems(mainList, navigate)}
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {element}
        </Container>
      </Box>
    </div>
  );
}

export default Navigator;
