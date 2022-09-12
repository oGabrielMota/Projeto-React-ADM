import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${params.id}/`
        )
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [params]);

  const subFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (params.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Alterado com Sucesso");
        })
        .catch(() => {
          alert("Erro ao Alterar Restaurante");
        });
    } else {
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Cadastrado com Sucesso");
        })
        .catch(() => {
          alert("Erro ao cadastrar Restaurante");
        });
    }
  };

  return (
    <form onSubmit={subFormulario}>
      <TextField
        value={nomeRestaurante}
        onChange={(evento) => setNomeRestaurante(evento.target.value)}
        id="standard"
        label="Nome do Restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        CADASTRAR
      </Button>
    </form>
  );
}
