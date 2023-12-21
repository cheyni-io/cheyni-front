import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomClassNameSetup";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import store from "./store";
import { extendedApi } from "./store/slices/configuration";
import palette from "./theme/palette";
import router from "./routes";
import MainLoadingScreen from "./components/MainLoadingScreen";
import CssBaseline from '@mui/material/CssBaseline';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

store.dispatch(extendedApi.endpoints.getConfiguration.initiate(undefined));

const App = () => {
  const themeMode: 'light' | 'dark' = useSelector((state: any) => state.theme.mode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: palette[themeMode],
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              html, body, #root {
                height: 100%;
              }
            `,
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

      <CssBaseline />
      <RouterProvider router={router} fallbackElement={<MainLoadingScreen />} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <App /> {/* Render the App component */}
  </Provider>
);
