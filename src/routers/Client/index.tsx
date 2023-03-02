import { Link, useNavigate, useParams } from "react-router-dom";
import { TableCell, Typography, Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import Tbl from "../../component/Tbl";
import { getClient, getClientList, addClient, updateClient } from "../../lib/api";

export interface IClient {
  id: number;
  фамилия: string;
  имя: string;
  отчество: string;
  город: string;
  адрес: string;
  телефон: string;
}

export function Client() {
  const navigate = useNavigate();
  const { client_id } = useParams();
	const [data, setData] = useState<IClient | null>(null);
  
  let edit:any = {};

  if(client_id && +client_id > 0) {
    if (!data) {
      getClient(+client_id).then((data: any) => {
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
    if(client_id) updateClient({
      id:+client_id,
      ...edit
    }).then(e=>{
      if(e) alert("Успешно!")
    })
  }

  return data ? (
    <>
      <Typography variant="h3" component="h4" color="white" mb="1em">
        Клиент #{data.id}
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
        onChange={e => {
          edit.имя=e.target.value
        }}
      />

      <TextField
        id="outlined"
        label="Отчество"
        defaultValue={data.отчество}
        onChange={e => {
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
          label="Город"
          defaultValue={data.город}
          onChange={e => {
            edit.город=e.target.value
          }}
        />

        <TextField
          id="outlined"
          label="Адрес"
          defaultValue={data.адрес}
          onChange={e => {
            edit.адрес=e.target.value
          }}
        />

        <TextField
          id="outlined"
          label="Телефон"
          defaultValue={data.телефон}
          onChange={e => {
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

export function ClientList() {
	const [list, setList] = useState<IClient[] | null>(null);

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
									find:`id:${id} ${фамилия} ${имя} ${отчество} ${город} ${адрес} ${телефон}`.toLowerCase(),
									data:(
									<>
										<TableCell><Link to={`/client/${id}`}>#{id}</Link></TableCell>
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

export function AddClientDialog(open: any, close: any) {
  const [имя, setИмя] = useState<string>("");
  const [фамилия, setФамилия] = useState<string>("");
  const [отчество, setОтчество] = useState<string>("");
  const [город, setГород] = useState<string>("");
  const [адрес, setАдрес] = useState<string>("");
  const [телефон, setТелефон] = useState<string>("");

  function addQuery() {

    addClient({
      имя,
      фамилия,
      отчество,
      город,
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
      <DialogTitle>Добавить клиента</DialogTitle>
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
          label="Город"
          onChange={e => setГород(e.target.value)}
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