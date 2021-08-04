import { CssBaseline, ThemeProvider, Typography } from "@material-ui/core";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MySuperForm from "./MySuperForm";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h1" align="center">
        Dishes
      </Typography>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MySuperForm />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
