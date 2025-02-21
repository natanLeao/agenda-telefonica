import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactList = () => {
  const [contatos, setContatos] = useState([]);
  const [busca, setBusca] = useState("");
  const [nomeEditado, setNomeEditado] = useState("");
  const [telefoneEditado, setTelefoneEditado] = useState("");
  const [contatoSelecionado, setContatoSelecionado] = useState(null);

  // Buscar contatos ao carregar a pagina
  useEffect(() => {
    fetch("http://localhost:3000/contatos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data); // <-- Verifica como os dados chegam
        setContatos(data);
      })
      .catch((error) => console.error("Erro ao buscar contatos:", error));
  }, []);  

  // Buscar contato por nome
  const buscarContato = () => {
    axios.get(`http://localhost:3000/contatos/buscar?nome=${busca}`)
      .then((res) => setContatos(res.data))
      .catch(() => alert("Contato não encontrado!"));
  };

  // Atualizar contato
  const atualizarContato = () => {
    if (!contatoSelecionado) {
      alert("Selecione um contato para atualizar.");
      return;
    }

    axios.put(`http://localhost:3000/contatos/${contatoSelecionado.id}`, {
      nome: nomeEditado,
      telefone: telefoneEditado
    })
    .then((res) => {
      alert("Contato atualizado com sucesso!");
      setContatos((prev) =>
        prev.map((c) => (c.id === contatoSelecionado.id ? res.data : c))
      );
      setContatoSelecionado(null);
    })
    .catch((err) => console.error("Erro ao atualizar contato:", err));
  };

  return (
    <div>
      <h2>Lista de Contatos</h2>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar contato pelo nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <button onClick={buscarContato}>Buscar</button>

      {/* Tabela de contatos */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {contatos.map((contato) => (
            <tr key={contato.id}>
              <td>{Number(contato.id)}</td>
              <td>{contato.nome}</td>
              <td>{contato.telefone}</td>
              <td>
                <button onClick={() => setContatoSelecionado(contato)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para atualizar contato */}
      {contatoSelecionado && (
        <div>
          <h3>Editar Contato</h3>
          <input
            type="text"
            placeholder="Novo nome"
            value={nomeEditado}
            onChange={(e) => setNomeEditado(e.target.value)}
          />
          <input
            type="text"
            placeholder="Novo telefone"
            value={telefoneEditado}
            onChange={(e) => setTelefoneEditado(e.target.value)}
          />
          <button onClick={atualizarContato}>Salvar Alteracoes</button>
        </div>
      )}
    </div>
  );
};

export default ContactList;
