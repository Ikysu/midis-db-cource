import { TableCell, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Tbl from "../../component/Tbl";
import { getContract, getContractList } from "../../lib/api";


export interface IConrtact {
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

export function Contract() {
  const navigate = useNavigate();
  const { contract_id } = useParams();
	const [data, setData] = useState<IConrtact | null>(null);

  if(contract_id && +contract_id > 0) {
    if (!data) {
      getContract(+contract_id).then((data: any) => {
        if (data && !data.status) {
          setData(data);
        } else {
          navigate("/")
        }
      });
    }
  }else{
    navigate("/")
  }

  return data ? (
    <>
      <Typography variant="h3" component="h4" color="white" mb="1em">
        Контракт #{data.id}
      </Typography>

      <Typography variant="h5" component="h6" color="white" mb="1em">
        Клиент <Link to={`/client/${data.клиентId}`}>#{data.клиентId}</Link>
      </Typography>

      <Typography variant="h5" component="h6" color="white" mb="1em">
        Дилер <Link to={`/dealer/${data.дилерId}`}>#{data.дилерId}</Link>
      </Typography>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <TextField
        disabled
        id="outlined-disabled"
        label="Дата заключения договора"
        value={new Date(data.дата_заключения_договора).toLocaleDateString()}
      />

      <TextField
        disabled
        id="outlined-disabled"
        label="Дата продажи"
        value={new Date(data.дата_продажи).toLocaleDateString()}
      />

      <TextField
        disabled
        id="outlined-disabled"
        label="Дата выпуска"
        value={new Date(data.дата_выпуска).toLocaleDateString()}
      />

      </Box>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
        <TextField
          disabled
          id="outlined-disabled"
          label="Марка автомобиля"
          value={data.марка_автомобиля}
        />

        <TextField
          disabled
          id="outlined-disabled"
          label="Пробег"
          value={data.пробег}
        />

        <TextField
          disabled
          id="outlined-disabled"
          label="Цена продажи"
          value={data.цена_продажи+"р."}
        />

      </Box>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
        <TextField
          disabled
          id="outlined-disabled"
          label="Размер комиссионных"
          value={data.размер_комиссионных+"р."}
        />

      <Typography variant="h5" component="h6" color="white" mb="1em">
        Примечание: {data.примечание}
      </Typography>

      </Box>
      



      <img src={data.фото_автомобиля} width="500px" />
    </>
  ) : (
    <></>
  )
}

export function ContractList() {
  const [list, setList] = useState<IConrtact[] | null>(null);

  if (!list) {
    getContractList().then((data: any) => {
      if (data && !data.status) setList(data);
    });
  }

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
                let date = new Date(дата_заключения_договора);
                return {
                  find:`id:${id} cid:${клиентId} did:${дилерId} ${date.toLocaleString()} ${цена_продажи}`.toLowerCase(),
                  data:(
                  <>
                    <TableCell><Link to={`/contract/${id}`}>#{id}</Link></TableCell>
                    <TableCell>{клиентId}</TableCell>
                    <TableCell>{дилерId}</TableCell>
                    <TableCell>{date.toLocaleString()}</TableCell>
                    <TableCell>{цена_продажи}</TableCell>
                  </>
                )}
              }
            )
          : []
      }
    />
  );
}