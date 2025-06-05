
const db = require('../models/db');

exports.getContacts = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM contatos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar contatos', details: error });
    }
};

// Buscar contato por ID
exports.getContactById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM contatos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Contato não encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar contato', details: error });
    }
};

exports.addContact = async (req, res) => {
    const { nome, telefone, cep, endereco, bairro, cidade, estado } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO contatos (nome, telefone, cep, endereco, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, telefone, cep, endereco, bairro, cidade, estado]
        );
        res.status(201).json({ id: result.insertId, nome, telefone, cep, endereco, bairro, cidade, estado });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar contato', details: error });
    }
};

exports.updateContact = async (req, res) => {
    const { id } = req.params;
    const { nome, telefone, cep, endereco, bairro, cidade, estado } = req.body;
    try {
        await db.query(
            'UPDATE contatos SET nome = ?, telefone = ?, cep = ?, endereco = ?, bairro = ?, cidade = ?, estado = ? WHERE id = ?',
            [nome, telefone, cep, endereco, bairro, cidade, estado, id]
        );
        res.json({ message: 'Contato atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar contato', details: error });
    }
};

exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM contatos WHERE id = ?', [id]);
        res.json({ message: 'Contato excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir contato', details: error });
    }
};
