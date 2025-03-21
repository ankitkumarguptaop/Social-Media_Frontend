'use client'
import { Box } from "@mui/material";
import "./globals.css";
import style from "./layout.module.css";
import ReduxProvider from "@/store/redux-provider";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <ReduxProvider>
            <SnackbarProvider>
              {children}
            </SnackbarProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
