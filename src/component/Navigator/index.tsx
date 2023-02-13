import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Pages } from "../../main";

export function Navigator({index, element}: {index: number, element: JSX.Element}) {
  const navigate = useNavigate();

  return (
    <div className={`page-${index}`}>
      {element}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={index}
          onChange={(event, newValue)=>{
            navigate(Pages[newValue].path, {replace: true})
            
          }}
        >
          {Pages.map(({label, icon}, i)=>{
            return (
              <BottomNavigationAction key={`page-${index}-${i}`} label={label} icon={icon} />
            )
          })}
        </BottomNavigation>
      </Paper>
    </div>
  )
}

export default Navigator;