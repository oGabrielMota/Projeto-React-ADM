import { Routes, Route } from "react-router-dom";
import FormularioPrato from "./paginas/adimin/Pratos/FormularioPrato";
import Pratos from "./paginas/adimin/Pratos/Pratos";
import AdminRestaurantes from "./paginas/adimin/Restaurantes";
import FormularioRestaurante from "./paginas/adimin/Restaurantes/FormularioRestaurante";
import PaginaBase from "./paginas/adimin/Restaurantes/PaginaBase";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/adm/" element={<PaginaBase />}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<Pratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
