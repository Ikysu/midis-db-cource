import { TableCell, TextField, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Tbl from "../../component/Tbl";
import { addContract, getContract, getContractList, updateContract } from "../../lib/api";


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

  let edit:any = {};

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

  function save() {
    if(contract_id) updateContract({
      id:+contract_id,
      ...edit
    }).then(e=>{
      if(e) alert("Успешно!")
    })
  }

  return data ? (
    <>
      <Typography variant="h3" component="h4" color="white" mb="1em">
        Контракт #{data.id}
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
          label="ID Клиента"
          defaultValue={data.клиентId}
          onChange={(e) => {
            edit.клиентId=e.target.value
          }}
        />

        <TextField
          id="outlined"
          label="ID Дилера"
          defaultValue={data.дилерId}
          onChange={(e) => {
            edit.дилерId=e.target.value
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
        type="date"
        label="Дата заключения договора"
        value={new Date(data.дата_заключения_договора)}
        onChange={(e) => {
          edit.дата_заключения_договора=`FROM_UNIXTIME(${Math.floor((+new Date(e.target.value))/1000)})`
        }}
      />

      <TextField
        id="outlined"
        type="date"
        label="Дата продажи"
        value={new Date(data.дата_продажи)}
        onChange={(e) => {
          edit.дата_продажи=`FROM_UNIXTIME(${Math.floor((+new Date(e.target.value))/1000)})`
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
          type="date"
          label="Дата выпуска"
          value={new Date(data.дата_выпуска)}
          onChange={(e) => {
            edit.дата_выпуска=`FROM_UNIXTIME(${Math.floor((+new Date(e.target.value))/1000)})`
          }}
        />
        
        <TextField
          id="outlined"
          label="Марка автомобиля"
          defaultValue={data.марка_автомобиля}
          onChange={(e) => {
            edit.марка_автомобиля=e.target.value
          }}
        />

        <TextField
          id="outlined"
          label="Пробег"
          defaultValue={data.пробег}
          onChange={(e) => {
            edit.пробег=+e.target.value
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
          label="Цена продажи"
          defaultValue={data.цена_продажи+"р."}
          onChange={(e) => {
            edit.цена_продажи=+e.target.value
          }}
        />
        
        <TextField
          id="outlined"
          label="Размер комиссионных"
          defaultValue={data.размер_комиссионных+"р."}
          onChange={(e) => {
            edit.размер_комиссионных=+e.target.value
          }}
        />

        
      </Box>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        fullWidth
      ><TextField
          fullWidth 
          id="outlined"
          label="Примечание"
          defaultValue={data.примечание}
          onChange={(e) => {
            edit.примечание=+e.target.value
          }}
        /></Box>
      



      <img src={data.фото_автомобиля} width="500px" />
      

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

export function AddContractDialog(open: any, close: any) {
  const [клиентId, setКлиентId] = useState<string>("");
  const [дилерId, setДилерId] = useState<string>("");
  const [дата_заключения_договора, setДЗД] = useState<string>("");
  const [дата_выпуска, setДВ] = useState<string>("");
  const [дата_продажи, setДП] = useState<string>("");
  const [фото_автомобиля, setФА] = useState<string>("");
  const [марка_автомобиля, setМА] = useState<string>("");
  const [пробег, setПробег] = useState<string>("");
  const [цена_продажи, setЦП] = useState<string>("");
  const [размер_комиссионных, setРК] = useState<string>("");
  const [примечание, setПримечание] = useState<string>("");

  // FROM_UNIXTIME

  function addQuery() {

    addContract({
      клиентId:+клиентId,
      дилерId:+дилерId,
      дата_заключения_договора:дата_заключения_договора ? `FROM_UNIXTIME(${Math.floor((+new Date(дата_заключения_договора))/1000)})` : "FROM_UNIXTIME(0)",
      дата_продажи:дата_продажи ? `FROM_UNIXTIME(${Math.floor((+new Date(дата_продажи))/1000)})` : "FROM_UNIXTIME(0)",
      дата_выпуска:дата_выпуска ? `FROM_UNIXTIME(${Math.floor((+new Date(дата_выпуска))/1000)})` : "FROM_UNIXTIME(0)",
      фото_автомобиля,
      марка_автомобиля,
      пробег:+пробег,
      цена_продажи:+цена_продажи,
      размер_комиссионных:+размер_комиссионных,
      примечание,
    }).then(e=>{
      if(e) alert("Успешно!")
      if(e) window.location.reload()
    })

    close()
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Добавить контракт</DialogTitle>
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
            label="КлиентId"
            onChange={e => setКлиентId(e.target.value)}
          />

          <TextField
            id="outlined"
            label="ДилерId"
            onChange={e => setДилерId(e.target.value)}
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
            type="date"
            label="Дата заключения договора"
            onChange={e => setДЗД(e.target.value)}
          />

          <TextField
            id="outlined"
            type="date"
            label="Дата продажи"
            onChange={e => setДП(e.target.value)}
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
            label="Фото автомобиля"
            onChange={e => setФА(e.target.value)}
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
            label="Марка автомобиля"
            onChange={e => setМА(e.target.value)}
          />

          <TextField
            id="outlined"
            type="date"
            label="Дата выпуска"
            onChange={e => setДВ(e.target.value)}
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
            label="Пробег"
            onChange={e => setПробег(e.target.value)}
          />

          <TextField
            id="outlined"
            label="Цена продажи"
            onChange={e => setЦП(e.target.value)}
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
            label="Размер комиссионных"
            onChange={e => setРК(e.target.value)}
          />

          <TextField
            id="outlined"
            label="Примечание"
            onChange={e => setПримечание(e.target.value)}
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