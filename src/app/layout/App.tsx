import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import Header from "./Header";
import { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import catalog from "../../features/catalog/catalog";
import productCard from "../../features/catalog/productCard";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import ProductDetail from "../../features/catalog/ProductDetail";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../../errors/ServerError';
import NotFound from '../../errors/Notfound';

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
      <ToastContainer position="bottom-right" hideProgressBar></ToastContainer>
      <CssBaseline></CssBaseline>
      <Header mode={mode} setMode={setMode}></Header>
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/catalog" component={catalog}></Route>
          <Route exact path="/productDetail/:id" component={ProductDetail}></Route>
          <Route exact path="/about" component={AboutPage}></Route>
          <Route exact path="/contact" component={ContactPage}></Route>
          <Route path="/server-error" component={ServerError}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
