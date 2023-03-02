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

export interface IClient {
  id: number;
  фамилия: string;
  имя: string;
  отчество: string;
  город: string;
  адрес: string;
  телефон: string;
}

export interface IDealer {
  id: number;
  фамилия: string;
  имя: string;
  отчество: string;
  фотография: string;
  адрес: string;
  телефон: string;
}
