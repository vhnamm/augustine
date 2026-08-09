import "./GlobalStyle.scss";
import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "~routes/routes.jsx";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop></ScrollToTop>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
