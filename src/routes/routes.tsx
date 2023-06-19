import {
  BrowserRouter,
  Routes as RouterContext,
  Route,
} from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import Logar from "../pages/Autenticacao/Logar";
import Registrar from "../pages/Autenticacao/Registrar";

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterContext>
        <Route path="/" element={<Home />} index />
        <Route path="logar" element={<Logar />} />
        <Route path="registrar" element={<Registrar />} />
      </RouterContext>
    </BrowserRouter>
  );
};
export default Routes;
