const express = require('express');
const cors = require('cors');
const router = express.Router();
const pool = require('./database');

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

// [GET] Buscar todos os contatos
app.get('/contatos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contatos');

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Contato não encontrado' });
        }

        res.json(rows[0]);  
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar contato' });
    }
});

// [POST] Adicionar um contato
app.post('/contatos', async (req, res) => {
    const { nome, telefone, cep, endereco, bairro, cidade, estado } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO contatos (nome, telefone, cep, endereco, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, telefone, cep, endereco, bairro, cidade, estado]
        );
        res.status(201).json({ id: result.insertId, nome, telefone, cep, endereco, bairro, cidade, estado });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar contato' });
    }
});

// [PUT] Atualizar um contato
app.put('/contatos/id', async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, cep, endereco, bairro, cidade, estado } = req.body;
    try {
        await pool.query(
            'UPDATE contatos SET nome = ?, telefone = ?, cep = ?, endereco = ?, bairro = ?, cidade = ?, estado = ? WHERE id = ?',
            [nome, telefone, cep, endereco, bairro, cidade, estado, id]
        );
        res.json({ id, nome, telefone, cep, endereco, bairro, cidade, estado });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar contato' });
    }
});

// [DELETE] Deletar um contato
app.delete('/contatos/id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM contatos WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar contato' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = router;
