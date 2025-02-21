import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ContactForm = ({ refreshContacts }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:3000/contacts", { nome, telefone });
    setNome("");
    setTelefone("");
    refreshContacts();
  };

  return (
    <div>
      <h2>Adicionar Contato</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" value={nome} onChange={e => setNome(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" value={telefone} onChange={e => setTelefone(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="primary">Salvar</Button>
      </Form>
    </div>
  );
};

export default ContactForm;
 
