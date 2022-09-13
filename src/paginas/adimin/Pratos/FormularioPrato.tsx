import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

export default function NovoPrato() {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState("");

  const [imagem, setImagem] = useState<File | null>(null);

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const selecionaArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const subFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);

    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then((resposta) => {
        setNomePrato("");
        setDescricao("");
        setTag("");
        setRestaurante("");
        alert("Prato cadastrado com Sucesso");
      })
      .catch((erro) => alert("Erro ao cadasrar prato"));
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
          Formulario de pratos{" "}
        </Typography>
        <Box component="form" onSubmit={subFormulario}>
          <TextField
            value={nomePrato}
            onChange={(evento) => setNomePrato(evento.target.value)}
            id="standard"
            label="Nome do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />
          <TextField
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            id="standard"
            label="Descrição"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />

          <FormControl margin="dense" fullWidth required>
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select
              labelId="select-tag"
              value={tag}
              onChange={(evento) => setTag(evento.target.value)}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth required>
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select
              labelId="select-restaurante"
              value={restaurante}
              onChange={(evento) => setRestaurante(evento.target.value)}
            >
              {restaurantes.map((restaurante) => (
                <MenuItem key={restaurante.id} value={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionaArquivo} />

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
