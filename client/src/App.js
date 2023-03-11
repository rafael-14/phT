import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import defaultTheme from "./styles/themes/default";
import Router from "./Router";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Header />
      <Router />
    </ThemeProvider>
  );
}

export default App;
