import { TableCell } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getContractList } from "../../lib/api";

export interface IConrtactList {
  id: number;
  клиентId: number;
  дилерId: number;
  дата_заключения_договора: string;
  дата_выпуска: string;
  дата_продажи: string;
  фото_автомобиля: string;
  марка_автомобиля: string;
  пробег: number;
  цена_продажи: number;
  размер_комиссионных: number;
  примечание: string;
}

export function ContractList() {
  const [list, setList] = useState<IConrtactList[] | null>(null);

  if (!list) {
    getContractList().then((data: any) => {
      if (data && !data.status) setList(data);
    });
  }

  return (
    <Tbl
      rows={[
        <TableCell>ID</TableCell>,
        <TableCell>ID Клиента</TableCell>,
        <TableCell>ID Дилера</TableCell>,
        <TableCell>Дата Заключения</TableCell>,
        <TableCell>Цена</TableCell>,
      ]}
      data={
        list
          ? list.map(
              ({
                id,
                клиентId,
                дилерId,
                дата_заключения_договора,
                цена_продажи,
              }) => {
                return (
                  <>
                    <TableCell>{id}</TableCell>
                    <TableCell>{клиентId}</TableCell>
                    <TableCell>{дилерId}</TableCell>
                    <TableCell>{дата_заключения_договора}</TableCell>
                    <TableCell>{цена_продажи}</TableCell>
                  </>
                );
              }
            )
          : []
      }
    />
  );
}

export default ContractList;
