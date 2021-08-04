import { createTheme, responsiveFontSizes } from "@material-ui/core";

const t = createTheme({
  palette: {
    type: "dark",
  },
});

export const theme = responsiveFontSizes(t);
