import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import Catalog from "../../features/catalog/catalog";
import Header from "./Header";
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState(false);
  const modeType = mode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: modeType,
      background: {
        default: modeType === "light" ? "#eaeaea" : "#121212"
      }
    }
  })

  return (
    <>
      <ThemeProvider theme={theme} >
        <CssBaseline></CssBaseline>
        <Header mode={mode} setMode={setMode}></Header>
        <Container>
          <Catalog></Catalog>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
