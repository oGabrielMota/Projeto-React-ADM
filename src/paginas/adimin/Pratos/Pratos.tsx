import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export default function Pratos() {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http
      .get("pratos/")
      .then((resposta) => setPratos(resposta.data))
      .catch((err) => console.log(err));
  }, []);

  const excluir = (pratoADeletar: IPrato) => {
    http.delete(`pratos/${pratoADeletar.id}/`).then(() => {
      const listaDePratos = pratos.filter(
        (pratos) => pratos.id !== pratoADeletar.id
      );
      setPratos([...listaDePratos]);
      alert("Prato Excluido com Sucesso");
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.descricao}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [{" "}
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  Ver Imagem
                </a>{" "}
                ]
              </TableCell>
              <TableCell>
                [<Link to={`/adm/restaurantes/${prato.id}`}>Editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
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
