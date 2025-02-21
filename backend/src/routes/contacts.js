const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Listar todos os contatos
router.get("/contatos", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT id, nome, telefone FROM contatos");
    res.json(rows); // Retorna os dados sem modificar o ID
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Adicionar um contato
router.post("/contatos", async (req, res) => {
  const { nome, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ error: "Nome e telefone são obrigatórios!" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO contatos (nome, telefone) VALUES (?, ?)",
      [nome, telefone]
    );

    res.status(201).json({
      id: result.insertId, // <-- Retorna o ID gerado pelo MySQL
      nome,
      telefone,
    });
  } catch (error) {
    console.error("Erro ao inserir contato:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Atualizar um contato
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;
  try {
    await db.query("UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?", [
      nome,
      telefone,
      id,
    ]);
    res.json({ message: "Contato atualizado!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar contato" });
  }
});

module.exports = router;
