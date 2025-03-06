CREATE DATABASE IF NOT EXISTS agenda;
USE agenda;

CREATE TABLE IF NOT EXISTS contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(10) NOT NULL,
    cep VARCHAR(8),
    endereco VARCHAR(200),
    bairro VARCHAR(200),
    cidade VARCHAR(200),
    estado VARCHAR(2)
); 
