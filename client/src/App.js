import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Router from "./Router";
import GlobalStyles from "./styles/global";
import defaultTheme from "./styles/themes/default";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Header />
        <Menu />
        <Router />
        <ToastContainer position="bottom-center" />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
