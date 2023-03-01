import { TableCell } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getDealerList } from "../../lib/api";

export interface IDealerList {
  id: number;
  фамилия: string;
  имя: string;
  отчество: string;
  фотография: string;
  адрес: string;
  телефон: string;
}

export function DealerList() {
  const [list, setList] = useState<IDealerList[] | null>(null);

  if (!list) {
    getDealerList().then((data: any) => {
      if (data && !data.status) setList(data);
    });
  }

  return (
    <Tbl
      whatSearch="dealer"
      rows={[
        <TableCell>ID</TableCell>,
        <TableCell>ФИО</TableCell>,
        <TableCell>Адрес</TableCell>,
        <TableCell>Телефон</TableCell>,
      ]}
      data={
        list
          ? list.map(({ id, фамилия, имя, отчество, адрес, телефон }) => {
              return {
                find:`id:${id} ${фамилия} ${имя} ${отчество} ${адрес} ${телефон}`,
                data:(
                <>
                  <TableCell>{id}</TableCell>
                  <TableCell>{`${фамилия} ${имя[0]}.${отчество[0]}.`}</TableCell>
                  <TableCell>{адрес}</TableCell>
                  <TableCell>{телефон}</TableCell>
                </>
              )};
            })
          : []
      }
    />
  );
}

export default DealerList;
