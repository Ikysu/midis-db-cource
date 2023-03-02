import { LibraryAdd } from "@mui/icons-material";
import {
  TableHead,
  TableRow,
  TableBody,
  Table,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Card,
} from "@mui/material";
import React, { useState } from "react";

import { AddClientDialog } from "../../routers/Client";
import { AddDealerDialog } from "../../routers/Dealer";
import { AddContractDialog } from "../../routers/Contract";
import { Dialoger } from "../Dialoger";

export function Tbl(props: any) {
  const {
    rows,
    data,
    whatSearch,
  }: { rows: any; data: any; whatSearch: string } = props;
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let dialogtype;

  switch (whatSearch) {
    case "client":
      dialogtype = Dialoger(open, handleClose, AddClientDialog());
      break;
    case "contract":
      dialogtype = Dialoger(open, handleClose, AddContractDialog());
      break;
    case "dealer":
      dialogtype = Dialoger(open, handleClose, AddDealerDialog());
      break;
  }

  function sorter() {
    const filters = filter.split(" ");
    return data.filter((row: any) => {
      let out = true;
      for (const filter of filters) {
        if (row.find.indexOf(filter) == -1) {
          out = false;
          break;
        }
      }
      return out;
    });
  }

  return (
    <>
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
          onChange={(e) => setFilter(e.target.value.toLowerCase())}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={handleClickOpen}
        >
          <LibraryAdd />
        </IconButton>
      </Paper>

      <Card sx={{ padding: ".5em" }}>
        <Table size="small">
          <TableHead>
            <TableRow>{rows}</TableRow>
          </TableHead>
          <TableBody>
            {sorter().map((row: any, index: number) => {
              return <TableRow key={index}>{row.data}</TableRow>;
            })}
          </TableBody>
        </Table>
      </Card>

      {dialogtype}
    </>
  );
}

export default Tbl;
