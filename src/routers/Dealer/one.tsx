import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { getDealer, updateDealer } from "../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { IDealer } from "../../types";
import { Input, InputBlock } from "../../component/Input";

export function Dealer() {
  const navigate = useNavigate();
  const { dealer_id } = useParams();
  const [data, setData] = useState<IDealer | null>(null);

  let edit: any = {};

  if (dealer_id && +dealer_id > 0) {
    if (!data) {
      getDealer(+dealer_id).then((data: any) => {
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
    if (dealer_id)
      updateDealer({
        id: +dealer_id,
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
        Дилер #{data.id}
      </Typography>

      {InputBlock([
        Input("Фамилия", setEdit, data),
        Input("Имя", setEdit, data),
        Input("Отчество", setEdit, data),
      ])}

      {InputBlock([
        Input("Адрес", setEdit, data),
        Input("Телефон", setEdit, data),
      ])}

      {InputBlock([<Button onClick={save}>Save</Button>])}
    </>
  );
}
