import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { getClient, updateClient } from "../../lib/api";
import { IClient } from "../../types";
import { Input, InputBlock } from "../../component/Input";

export function Client() {
  const navigate = useNavigate();
  const { client_id } = useParams();
  const [data, setData] = useState<IClient | null>(null);

  let edit: any = {};

  if (client_id && +client_id > 0) {
    if (!data) {
      getClient(+client_id).then((data: any) => {
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
    if (client_id)
      updateClient({
        id: +client_id,
        ...edit,
      }).then((e) => {
        if (e) alert("Успешно!");
      });
  }

  function setEdit(param: string, data: any) {
    edit[param] = data;
  }

  if (!data) return (<></>);

  return (
    <>
      <Typography variant="h3" component="h4" color="white" mb="1em">
        Клиент #{data.id}
      </Typography>

      {InputBlock([
        Input("Фамилия", setEdit, data),
        Input("Имя", setEdit, data),
        Input("Отчество", setEdit, data),
      ])}

      {InputBlock([
        Input("Город", setEdit, data),
        Input("Адрес", setEdit, data),
        Input("Телефон", setEdit, data),
      ])}

      {InputBlock([<Button onClick={save}>Save</Button>])}
    </>
  );
}
