import { TableCell } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getClientList } from "../../lib/api";

export interface IClientList {
  id: number;
  фамилия: string;
  имя: string;
  отчество: string;
  город: string;
  адрес: string;
  телефон: string;
}

export function ClientList() {
  const [list, setList] = useState<IClientList[] | null>(null);

  if (!list) {
    getClientList().then((data: any) => {
      if (data && !data.status) setList(data);
    });
  }

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
      data={
        list
          ? list.map(
              ({ id, фамилия, имя, отчество, город, адрес, телефон }) => {
                return {
                  find:`id:${id} ${фамилия} ${имя} ${отчество} ${город} ${адрес} ${телефон}`,
                  data:(
                  <>
                    <TableCell>{id}</TableCell>
                    <TableCell>{`${фамилия} ${имя[0]}.${отчество[0]}.`}</TableCell>
                    <TableCell>{город}</TableCell>
                    <TableCell>{адрес}</TableCell>
                    <TableCell>{телефон}</TableCell>
                  </>
                )};
              }
            )
          : []
      }
    />
  );
}

export default ClientList;
