import "./style.module.css";
import React from "react";

export function Finder() {
  const [value, setValue] = React.useState(0);

  return (
    <div className="Finder">
      <h1>Vite + React</h1>
      Профиль клиента со списком продоваемых авто<br/>
      Профиль дилера со списком договоров и клиентов<br/>
      Поиск<br/>
      
      
      
    </div>
  );
}

export default Finder;