import "./css/Code.css";

import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MySuperForm from "./MySuperForm";
import { theme } from "./theme";
import { useState } from "react";

function App() {
  const [responseToDisplay, setResponseToDisplay] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h1" align="center">
        Dishes
      </Typography>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MySuperForm setResponseToDisplay={setResponseToDisplay} />
      </MuiPickersUtilsProvider>
      {responseToDisplay.length > 0 && (
        <Box m={2} className="response">
          <Typography variant="h1" align="center" gutterBottom>
            API Response
          </Typography>
          <Paper>
            <code>{responseToDisplay}</code>
          </Paper>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
