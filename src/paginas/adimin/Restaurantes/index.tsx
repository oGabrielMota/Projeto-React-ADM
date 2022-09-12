import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function AdminRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v2/restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data))
      .catch((err) => console.log(err));
  }, []);

  const excluir = (restauranteADeletar: IRestaurante) => {
    axios
      .delete(
        `http://localhost:8000/api/v2/restaurantes/${restauranteADeletar.id}/`
      )
      .then(() => {
        const listaRestaurantes = restaurantes.filter(
          (restaurante) => restaurante.id !== restauranteADeletar.id
        );
        setRestaurantes([...listaRestaurantes]);
        alert("Restaurante Excluido com Sucesso");
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [<Link to={`/adm/restaurantes/${restaurante.id}`}>Editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(restaurante)}
                >
                  {" "}
                  Excluir{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
