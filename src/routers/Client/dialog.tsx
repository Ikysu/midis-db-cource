import { useState } from "react";
import { addClient } from "../../lib/api";
import { Input, InputBlock } from "../../component/Input";

export function AddClientDialog() {
  const [имя, setИмя] = useState<string>("");
  const [фамилия, setФамилия] = useState<string>("");
  const [отчество, setОтчество] = useState<string>("");
  const [город, setГород] = useState<string>("");
  const [адрес, setАдрес] = useState<string>("");
  const [телефон, setТелефон] = useState<string>("");

  function query() {
    addClient({
      имя,
      фамилия,
      отчество,
      город,
      адрес,
      телефон,
    }).then((e) => {
      if (e) alert("Успешно!");
      if (e) window.location.reload();
    });
  }

  return {
    title: "Добавить клиента",
    content: [
      InputBlock([
        Input("Фамилия", (p: string, d: any) => {
          setФамилия(d);
        }),
        Input("Имя", (p: string, d: any) => {
          setИмя(d);
        }),
      ]),
      InputBlock([
        Input("Отчество", (p: string, d: any) => {
          setОтчество(d);
        }),
        Input("Город", (p: string, d: any) => {
          setГород(d);
        }),
      ]),
      InputBlock([
        Input("Адрес", (p: string, d: any) => {
          setАдрес(d);
        }),
        Input("Телефон", (p: string, d: any) => {
          setТелефон(d);
        }),
      ]),
    ],
    query,
  };
}
