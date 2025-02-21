const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let contatos = [];

// Endpoint para adicionar contatos
app.post("/contatos", (req, res) => {
  const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ error: "Nome e telefone são obrigatórios" });
  }

  const novoContato = { id: contatos.length + 1, nome, telefone };
  contatos.push(novoContato);

  res.status(201).json(novoContato);
});

// Endpoint para buscar todos os contatos
app.get("/contatos", (req, res) => {
  res.json(contatos);
});

// Endpoint para buscar um contato pelo nome
app.get("/contatos/buscar", (req, res) => {
  const { nome } = req.query;
  const resultado = contatos.filter((c) => c.nome.toLowerCase().includes(nome.toLowerCase()));

  if (resultado.length === 0) {
    return res.status(404).json({ message: "Contato não encontrado" });
  }

  res.json(resultado);
});

// Endpoint para atualizar um contato pelo ID
app.put("/contatos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;

  const contato = contatos.find((c) => c.id === parseInt(id));

  if (!contato) {
    return res.status(404).json({ error: "Contato não encontrado" });
  }

  contato.nome = nome || contato.nome;
  contato.telefone = telefone || contato.telefone;

  res.json(contato);
});

app.get("/", (req, res) => {
  res.send("API rodando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
