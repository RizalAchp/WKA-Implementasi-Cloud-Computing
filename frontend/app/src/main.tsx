import React from "react";
import ReactDOM from "react-dom/client";

import { Global, MantineProvider, MantineTheme } from "@mantine/core";
import { MainApp } from "./pages/Main";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global
      styles={(theme: MantineTheme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        a: {
          color: theme.colors.blue[5],
          textDecoration: "none",
          textAlign: "center",
        },

        "a:hover": {
          color: theme.colors.red[5],
        },

        body: {
          ...theme.fn.fontStyles(),
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          lineHeight: theme.lineHeight,
        },
      })}
    />
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        fontFamily: "Open Sans",
        colors: {
          dark: [
            "#d5d7e0",
            "#acaebf",
            "#8c8fa3",
            "#666980",
            "#4d4f66",
            "#34354a",
            "#2b2c3d",
            "#1d1e30",
            "#0c0d21",
            "#01010a",
          ],
        },
      }}
      defaultProps={{
        Container: {
          sizes: {
            xs: 500,
            sm: 800,
            md: 1000,
            lg: 1200,
            xl: 1400,
          },
        },
      }}
    >
      <MainApp />
    </MantineProvider>
  </React.StrictMode>
);
