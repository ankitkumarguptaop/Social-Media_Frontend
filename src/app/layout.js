'use client'
import { Box } from "@mui/material";
import "./globals.css";
import style from "./layout.module.css";
import ReduxProvider from "@/store/redux-provider";
import { SnackbarProvider } from "notistack";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SnackbarProvider>
           {children}
           </SnackbarProvider>
           </ReduxProvider>
      </body>
    </html>
  );
}
