import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getClientList } from "../../lib/api";
import { IClient } from "../../types";

export function ClientList() {
  const [list, setList] = useState<IClient[] | null>(null);

  if (!list) {
    getClientList().then((data: any) => {
      if (data && !data.status) setList(data);
    });
  }

  if (!list) return (<></>);

  return (
    <Tbl
      whatSearch="client"
      rows={[
        <TableCell>ID</TableCell>,
        <TableCell>ФИО</TableCell>,
        <TableCell>Город</TableCell>,
        <TableCell>Адрес</TableCell>,
        <TableCell>Телефон</TableCell>,
      ]}
      data={list.map(
        ({ id, фамилия, имя, отчество, город, адрес, телефон }) => {
          return {
            find: `id:${id} ${фамилия} ${имя} ${отчество} ${город} ${адрес} ${телефон}`.toLowerCase(),
            data: (
              <>
                <TableCell>
                  <Link to={`/client/${id}`}>#{id}</Link>
                </TableCell>
                <TableCell>{`${фамилия} ${имя[0]}.${отчество[0]}.`}</TableCell>
                <TableCell>{город}</TableCell>
                <TableCell>{адрес}</TableCell>
                <TableCell>{телефон}</TableCell>
              </>
            ),
          };
        }
      )}
    />
  );
}
