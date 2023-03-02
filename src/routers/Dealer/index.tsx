import { TableCell, Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getDealerList, getDealer, addDealer, updateDealer } from "../../lib/api";
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

  let edit:any = {};

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

  function save() {
    if(dealer_id) updateDealer({
      id:+dealer_id,
      ...edit
    }).then(e=>{
      if(e) alert("Успешно!")
    })
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
        id="outlined"
        label="Фамилия"
        defaultValue={data.фамилия}
        onChange={(e) => {
          edit.фамилия=e.target.value
        }}
      />

      <TextField
        id="outlined"
        label="Имя"
        defaultValue={data.имя}
        onChange={(e) => {
          edit.имя=e.target.value
        }}
      />

      <TextField
        id="outlined"
        label="Отчество"
        defaultValue={data.отчество}
        onChange={(e) => {
          edit.отчество=e.target.value
        }}
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
          id="outlined"
          label="Адрес"
          defaultValue={data.адрес}
          onChange={(e) => {
            edit.адрес=e.target.value
          }}
        />

        <TextField
          id="outlined"
          label="Телефон"
          defaultValue={data.телефон}
          onChange={(e) => {
            edit.телефон=e.target.value
          }}
        />

      </Box>

      

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      ><Button onClick={save}>Save</Button></Box>
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

export function AddDealerDialog(open: any, close: any) {
  const [имя, setИмя] = useState<string>("");
  const [фамилия, setФамилия] = useState<string>("");
  const [отчество, setОтчество] = useState<string>("");
  const [фотография, setФотография] = useState<string>("");
  const [адрес, setАдрес] = useState<string>("");
  const [телефон, setТелефон] = useState<string>("");

  function addQuery() {

    addDealer({
      имя,
      фамилия,
      отчество,
      фотография,
      адрес,
      телефон,
    }).then(e=>{
      if(e) alert("Успешно!")
      if(e) window.location.reload()
    })

    close()
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Добавить дилера</DialogTitle>
      <DialogContent>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined"
          label="Фамилия"
          onChange={e => setФамилия(e.target.value)}
        />

        <TextField
          id="outlined"
          label="Имя"
          onChange={e => setИмя(e.target.value)}
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
          id="outlined"
          label="Отчество"
          onChange={e => setОтчество(e.target.value)}
        />
        <TextField
          id="outlined"
          label="Фотография ()"
          onChange={e => setФотография(e.target.value)}
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
          id="outlined"
          label="Адрес"
          onChange={e => setАдрес(e.target.value)}
        />
        <TextField
          id="outlined"
          label="Телефон"
          onChange={e => setТелефон(e.target.value)}
        />
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Отмена</Button>
        <Button onClick={addQuery}>Добавить</Button>
      </DialogActions>
    </Dialog>
  )
}
