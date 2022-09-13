import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

export default function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      http
        .get<IRestaurante>(`restaurantes/${params.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [params]);

  const subFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (params.id) {
      http
        .put(`restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Alterado com Sucesso");
        })
        .catch(() => {
          alert("Erro ao Alterar Restaurante");
        });
    } else {
      http
        .post("restaurantes/", {
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <Typography component="h1" variant="h6">
          {" "}
          Formulario de restaurantes{" "}
        </Typography>
        <Box component="form" onSubmit={subFormulario}>
          <TextField
            value={nomeRestaurante}
            onChange={(evento) => setNomeRestaurante(evento.target.value)}
            id="standard"
            label="Nome do Restaurante"
            variant="standard"
            fullWidth
            required
          />
          <Button
            sx={{ marginTop: 3 }}
            fullWidth
            type="submit"
            variant="outlined"
          >
            CADASTRAR
          </Button>
        </Box>
      </Box>
    </>
  );
}
