import { useState } from "react";
import { addContract } from "../../lib/api";
import { Input, InputBlock } from "../../component/Input";

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

  function query() {
    addContract({
      клиентId: +клиентId,
      дилерId: +дилерId,
      дата_заключения_договора: дата_заключения_договора
        ? `FROM_UNIXTIME(${Math.floor(
            +new Date(дата_заключения_договора) / 1000
          )})`
        : "FROM_UNIXTIME(0)",
      дата_продажи: дата_продажи
        ? `FROM_UNIXTIME(${Math.floor(+new Date(дата_продажи) / 1000)})`
        : "FROM_UNIXTIME(0)",
      дата_выпуска: дата_выпуска
        ? `FROM_UNIXTIME(${Math.floor(+new Date(дата_выпуска) / 1000)})`
        : "FROM_UNIXTIME(0)",
      фото_автомобиля,
      марка_автомобиля,
      пробег: +пробег,
      цена_продажи: +цена_продажи,
      размер_комиссионных: +размер_комиссионных,
      примечание,
    }).then((e) => {
      if (e) alert("Успешно!");
      if (e) window.location.reload();
    });
  }

  return {
    title: "Добавить контракт",
    content: [
      InputBlock([
        Input("КлиентId", (p: string, d: any) => {
          setКлиентId(d);
        }),
        Input("ДилерId", (p: string, d: any) => {
          setДилерId(d);
        }),
      ]),
      InputBlock([
        Input("Дата заключения договора", (p: string, d: any) => {
          setДЗД(d);
        }, undefined, "date"),
        Input("Дата продажи", (p: string, d: any) => {
          setДП(d);
        }, undefined, "date"),
      ]),
      InputBlock([
        Input("Фото автомобиля", (p: string, d: any) => {
          setФА(d);
        }),
      ]),
      InputBlock([
        Input("Марка автомобиля", (p: string, d: any) => {
          setМА(d);
        }),
        Input("Дата выпуска", (p: string, d: any) => {
          setДВ(d);
        }, undefined, "date"),
      ]),
      InputBlock([
        Input("Пробег", (p: string, d: any) => {
          setПробег(d);
        }),
        Input("Цена продажи", (p: string, d: any) => {
          setЦП(d);
        }),
      ]),
      InputBlock([
        Input("Размер комиссионных", (p: string, d: any) => {
          setРК(d);
        }),
        Input("Примечание", (p: string, d: any) => {
          setПримечание(d);
        }),
      ]),
    ],
    query
  };
}