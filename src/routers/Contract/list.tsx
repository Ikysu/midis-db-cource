import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getContractList } from "../../lib/api";
import { IConrtact } from "../../types";

export function ContractList() {
  const [list, setList] = useState<IConrtact[] | null>(null);

  if (!list) {
    getContractList().then((data: any) => {
      if (data && !data.status) setList(data);
    });
  }

  if (!list) return (<></>);

  return (
    <Tbl
      whatSearch="contract"
      rows={[
        <TableCell>ID</TableCell>,
        <TableCell>ID Клиента</TableCell>,
        <TableCell>ID Дилера</TableCell>,
        <TableCell>Дата Заключения</TableCell>,
        <TableCell>Цена</TableCell>,
      ]}
      data={list.map(
        ({ id, клиентId, дилерId, дата_заключения_договора, цена_продажи }) => {
          let date = new Date(дата_заключения_договора);
          return {
            find: `id:${id} cid:${клиентId} did:${дилерId} ${date.toLocaleDateString()} ${цена_продажи}`.toLowerCase(),
            data: (
              <>
                <TableCell>
                  <Link to={`/contract/${id}`}>#{id}</Link>
                </TableCell>
                <TableCell>{клиентId}</TableCell>
                <TableCell>{дилерId}</TableCell>
                <TableCell>{date.toLocaleDateString()}</TableCell>
                <TableCell>{цена_продажи}</TableCell>
              </>
            ),
          };
        }
      )}
    />
  );
}
