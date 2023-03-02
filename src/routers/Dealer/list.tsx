import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getDealerList } from "../../lib/api";
import { IDealer } from "../../types";

export function DealerList() {
  const [list, setList] = useState<IDealer[] | null>(null);

  if (!list) {
    getDealerList().then((data: any) => {
      if (data && !data.status) setList(data);
    });
  }

  if (!list) return (<></>);

  return (
    <Tbl
      whatSearch="dealer"
      rows={[
        <TableCell>ID</TableCell>,
        <TableCell>ФИО</TableCell>,
        <TableCell>Адрес</TableCell>,
        <TableCell>Телефон</TableCell>,
      ]}
      data={list.map(({ id, фамилия, имя, отчество, адрес, телефон }) => {
        return {
          find: `id:${id} ${фамилия} ${имя} ${отчество} ${адрес} ${телефон}`.toLowerCase(),
          data: (
            <>
              <TableCell>
                <Link to={`/dealer/${id}`}>#{id}</Link>
              </TableCell>
              <TableCell>{`${фамилия} ${имя[0]}.${отчество[0]}.`}</TableCell>
              <TableCell>{адрес}</TableCell>
              <TableCell>{телефон}</TableCell>
            </>
          ),
        };
      })}
    />
  );
}
