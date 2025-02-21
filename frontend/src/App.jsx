import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [busca, setBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Buscar contatos ao carregar a pagina
  useEffect(() => {
    buscarContatos();
  }, []);

  // Funcao para buscar contatos
  const buscarContatos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contatos");
      setContatos(response.data);
    } catch (error) {
      console.error("Erro ao buscar contatos", error);
    }
  };

  // Funcao para adicionar contato
  const adicionarContato = async () => {
    if (!nome || !telefone) return alert("Preencha nome e telefone!");
    try {
      await axios.post("http://localhost:3000/contatos", { nome, telefone });
      buscarContatos();
      setNome("");
      setTelefone("");
    } catch (error) {
      console.error("Erro ao adicionar contato", error);
    }
  };

  // Funcao para editar contato
  const editarContato = async () => {
    if (!nome || !telefone || !editandoId) return alert("Preencha todos os campos!");
    try {
      await axios.put(`http://localhost:3000/contatos/${editandoId}`, { nome, telefone });
      buscarContatos();
      setNome("");
      setTelefone("");
      setEditandoId(null);
    } catch (error) {
      console.error("Erro ao editar contato", error);
    }
  };

  // Filtrar contatos com base na busca
  const contatosFiltrados = contatos.filter(contato =>
    contato.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <h1>Agenda Telefonica</h1>

      {/* Campo de Busca */}
      <input
        type="text"
        placeholder="Buscar contato..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <h2>{editandoId ? "Editar Contato" : "Adicionar Contato"}</h2>

      {/* Campos de Nome e Telefone */}
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <button onClick={editandoId ? editarContato : adicionarContato}>
        {editandoId ? "Atualizar" : "Adicionar"}
      </button>

      <h2>Lista de Contatos</h2>
      <ul>
        {contatosFiltrados.map((contato) => (
          <li key={contato.id}>
            {contato.nome} - {contato.telefone}
            <button onClick={() => {
              setNome(contato.nome);
              setTelefone(contato.telefone);
              setEditandoId(contato.id);
            }}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;