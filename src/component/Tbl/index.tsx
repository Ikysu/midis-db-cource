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
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {AddClientDialog} from '../../routers/Client'

export function Tbl(props: any) {
  const { rows, data, whatSearch }: { rows: any; data: any, whatSearch: string } = props;

  var [filter, setFilter] = useState<string>("");  

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let dialogtype;

  switch (whatSearch) {
    case "client":
      dialogtype=AddClientDialog(open, handleClose);
      break;
    case "contract":
      dialogtype=AddClientDialog(open, handleClose);
      break;
    case "dealer":
      dialogtype=AddClientDialog(open, handleClose);
      break;
  }

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
          placeholder="Search"
          id="search"
          inputProps={{ maxLength: 64 }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={()=>{
          const input = document.getElementById("search") as HTMLInputElement;
          setFilter(input?.value?.toLowerCase() ?? "")
        }}>
          <Search />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions" onClick={handleClickOpen}>
          <LibraryAdd />
        </IconButton>
      </Paper>

      <Card sx={{ padding: ".5em" }}>
        <Table size="small">
          <TableHead>
            <TableRow>{rows}</TableRow>
          </TableHead>
          <TableBody>
            {data.filter((row:any)=>row.find.indexOf(filter) != -1).map((row: any, index: number) => {
              return (<TableRow key={index}>{row.data}</TableRow>)
            })}
          </TableBody>
        </Table>
      </Card>

      {dialogtype}
    </React.Fragment>
  );
}

export default Tbl;
