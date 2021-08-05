import { createTheme, responsiveFontSizes } from "@material-ui/core";

const t = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1565c0",
    },
  },
});

export const theme = responsiveFontSizes(t);
