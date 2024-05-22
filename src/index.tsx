import { customTheme } from "@/styles/themeCustom";
import { ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// const theme = createTheme(getCheckoutTheme("light"));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GlobalStyles>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </GlobalStyles>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
