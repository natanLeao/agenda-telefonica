const pool = require(`./database`);

// [GET] Buscar todos os contatos
exports.getContacts = async (req, res) => {

  try {
    const [rows] = await pool.query('SELECT * FROM contatos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar contatos' });
 }
};

// [POST] Adicionar um contato
exports.addContact = async (req, res) => {
  const { nome, telefone } = req.body;

  try {
    const [result] = await pool.query('INSERT INTO contatos (nome, telefone) VALUES (?, ?)', [nome, telefone]);
    res.status(201).json({ id: result.insertId, nome, telefone });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar contato' });
  }
};

// [PUT] Atualizar um contato
exports.updateContact('/contatos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;

  try {
    await pool.query('UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?', [nome, telefone, id]);
    res.json({ message: 'Contato atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar contato' });
  }
});

// [DELETE] Excluir um contato
exports.deleteContact('/contatos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM contatos WHERE id = ?', [id]);
    res.json({ message: 'Contato excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir contato' });
  }
});
