import { Title } from "@mui/icons-material";
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table as Tbl,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export function Table({ rows, data }: { rows: [any]; data: [any] }) {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Tbl size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Tbl>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}

export default Table;
