import { TableCell, Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getDealerList, getDealer } from "../../lib/api";
import { Link, useNavigate, useParams } from "react-router-dom";

export interface IDealer {
	id: number;
	фамилия: string;
	имя: string;
	отчество: string;
	фотография: string;
	адрес: string;
	телефон: string;
}

export function Dealer() {
  const navigate = useNavigate();
  const { dealer_id } = useParams();
	const [data, setData] = useState<IDealer | null>(null);

  if(dealer_id && +dealer_id > 0) {
    if (!data) {
      getDealer(+dealer_id).then((data: any) => {
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
        Дилер #{data.id}
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
        label="Фамилия"
        value={data.фамилия}
      />

      <TextField
        disabled
        id="outlined-disabled"
        label="Имя"
        value={data.имя}
      />

      <TextField
        disabled
        id="outlined-disabled"
        label="Отчество"
        value={data.отчество}
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
          label="Адрес"
          value={data.адрес}
        />

        <TextField
          disabled
          id="outlined-disabled"
          label="Телефон"
          value={data.телефон}
        />

      </Box>
    </>
  ) : (
    <></>
  )
}

export function DealerList() {
  const [list, setList] = useState<IDealer[] | null>(null);

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
                find:`id:${id} ${фамилия} ${имя} ${отчество} ${адрес} ${телефон}`.toLowerCase(),
                data:(
                <>
                  <TableCell><Link to={`/dealer/${id}`}>#{id}</Link></TableCell>
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

