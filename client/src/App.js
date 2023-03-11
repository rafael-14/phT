import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import defaultTheme from "./styles/themes/default";
import Router from "./Router";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Header />
      <Router />
      <ToastContainer position="bottom-center" />
    </ThemeProvider>
  );
}

export default App;
