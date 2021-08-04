import { CssBaseline, ThemeProvider } from "@material-ui/core";

import MySuperForm from "./MySuperForm";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MySuperForm />
    </ThemeProvider>
  );
}

export default App;
