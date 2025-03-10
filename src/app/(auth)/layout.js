import { Box } from "@mui/material";
import style from "./auth.module.css";

export default function AuthLayout({ children }) {
  return (
   
        <Box className={style["container"]}>
          <Box className={style["auth-container"]}>
            <Box className={style["insta-logo"]}></Box>
            {children}
          </Box>
        </Box>
    
  );
}
