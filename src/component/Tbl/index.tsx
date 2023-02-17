import { LibraryAdd, Search } from "@mui/icons-material";
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TextField,
  ButtonGroup,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Card,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export function Tbl(props: any) {
  const { rows, data }: { rows: any; data: any } = props;
  return (
    <React.Fragment>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          marginBottom: "1em",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <LibraryAdd />
        </IconButton>
      </Paper>

      <Card sx={{ padding: ".5em" }}>
        <Table size="small">
          <TableHead>
            <TableRow>{rows}</TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow key={index}>{row}</TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </React.Fragment>
  );
}

export default Tbl;
