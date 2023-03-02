import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import { getContract, updateContract } from "../../lib/api";
import { IConrtact } from "../../types";
import { Input, InputBlock } from "../../component/Input";

export function Contract() {
  const navigate = useNavigate();
  const { contract_id } = useParams();
  const [data, setData] = useState<IConrtact | null>(null);

  let edit: any = {};

  if (contract_id && +contract_id > 0) {
    if (!data) {
      getContract(+contract_id).then((data: any) => {
        if (data && !data.status) {
          setData(data);
        } else {
          navigate("/");
        }
      });
    }
  } else {
    navigate("/");
  }

  function save() {
    if (contract_id)
      updateContract({
        id: +contract_id,
        ...edit,
      }).then((e) => {
        if (e) alert("Успешно!");
      });
  }

  function formatDate(date: Date) {
    console.log(+date);
    let month = `${date.getMonth() + 1}`,
      day = `${date.getDay() + 1}`;
    if (month.length != 2) month = "0" + month;
    if (day.length != 2) day = "0" + day;
    return date.getFullYear() + "-" + month + "-" + day;
  }

  function setEdit(param: string, data: any) {
    edit[param] = data;
  }

  if (!data) return (<></>);

  return (
    <>
      <Typography variant="h3" component="h4" color="white" mb="1em">
        Контракт #{data.id}
      </Typography>

      {InputBlock([
        <TextField
          id="outlined"
          label="ID Клиента"
          defaultValue={data.клиентId}
          onChange={(e) => {
            setEdit("клиентId", e.target.value);
          }}
        />,
        <TextField
          id="outlined"
          label="ID Дилера"
          defaultValue={data.дилерId}
          onChange={(e) => {
            setEdit("дилерId", e.target.value);
          }}
        />,
      ])}

      {InputBlock([
        <TextField
          id="outlined"
          type="date"
          label="Дата заключения договора"
          value={formatDate(new Date(data.дата_заключения_договора))}
          onChange={(e) => {
            setEdit(
              "дата_заключения_договора",
              `FROM_UNIXTIME(${Math.floor(+new Date(e.target.value) / 1000)})`
            );
          }}
        />,
        <TextField
          id="outlined"
          type="date"
          label="Дата продажи"
          value={formatDate(new Date(data.дата_продажи))}
          onChange={(e) => {
            setEdit(
              "дата_продажи",
              `FROM_UNIXTIME(${Math.floor(+new Date(e.target.value) / 1000)})`
            );
          }}
        />,
      ])}

      {InputBlock([
        <TextField
          id="outlined"
          type="date"
          label="Дата выпуска"
          value={formatDate(new Date(data.дата_выпуска))}
          onChange={(e) => {
            setEdit(
              "дата_выпуска",
              `FROM_UNIXTIME(${Math.floor(+new Date(e.target.value) / 1000)})`
            );
          }}
        />,
        Input("Марка автомобиля", setEdit, data),
        Input("Пробег", setEdit, data),
      ])}

      {InputBlock([
        Input("Цена продажи", setEdit, data),
        Input("Размер комиссионных", setEdit, data),
      ])}

      <Box
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      >
        <TextField
          fullWidth
          id="outlined"
          label="Примечание"
          defaultValue={data.примечание}
          onChange={(e) => {
            setEdit("примечание", +e.target.value);
          }}
        />
      </Box>

      <img src={data.фото_автомобиля} width="500px" />

      {InputBlock([<Button onClick={save}>Save</Button>])}
    </>
  );
}
