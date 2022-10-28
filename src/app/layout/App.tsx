import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import Header from "./Header";
import { useState } from 'react';
import { Route } from "react-router-dom";
import catalog from "../../features/catalog/catalog";
import productCard from "../../features/catalog/productCard";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import ProductDetail from "../../features/catalog/ProductDetail";

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
    
      <ThemeProvider theme={theme} >
        <CssBaseline></CssBaseline>
        <Header mode={mode} setMode={setMode}></Header>
        <Container>
          <Route exact path="/"  component={HomePage}></Route>
          <Route exact path="/catalog"  component={catalog}></Route>
          <Route exact path="/productDetail/:id"  component={ProductDetail}></Route>
          <Route exact path="/about"  component={AboutPage}></Route>
          <Route exact path="/contact"  component={ContactPage}></Route>         
        </Container>
      </ThemeProvider>
  );
}

export default App;
