import { Routes, Route } from "react-router-dom";
import AdminRestaurantes from "./paginas/adimin/Restaurantes";
import FormularioRestaurante from "./paginas/adimin/Restaurantes/FormularioRestaurante";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/adm/restaurantes" element={<AdminRestaurantes />} />
      <Route
        path="/adm/restaurantes/novo"
        element={<FormularioRestaurante />}
      />
      <Route path="/adm/restaurantes/:id" element={<FormularioRestaurante />} />
    </Routes>
  );
}

export default App;
