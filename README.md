# 📞 Agenda Telefônica

Sistema de uma **Agenda Telefônica** desenvolvido com:

- 🚀 **Backend:** Node.js + Express + MySQL  
- 🎨 **Frontend:** HTML, CSS, JavaScript (servido por NGINX)  
- 🗄️ **Banco de Dados:** MySQL  
- 🐳 **Orquestração:** Docker + Docker Compose  

---

## 🗂️ Estrutura do Projeto

```
.
├── backend/          → API Node.js + Express
├── database/         → Banco MySQL com script de criação
├── frontend/         → Interface Web + NGINX
├── docker-compose.yaml → Gerencia os containers
└── README.md
```

---

## 🚀 Como rodar o projeto

### 🔧 Pré-requisitos

- ✔️ [Docker](https://www.docker.com/) instalado  
- ✔️ [Docker Compose](https://docs.docker.com/compose/) instalado  

---

### ▶️ Passo a passo:

1️⃣ Clone o repositório:

```bash
git clone https://github.com/natanLeao/agenda-telefonica.git
cd agenda-telefonica
```

2️⃣ Rode o projeto:

```bash
docker-compose up --build
```

3️⃣ Acesse no navegador:

- 🔗 **Frontend:** [http://localhost:8080](http://localhost:8080)  
- 🔗 **Backend API:** [http://localhost:3000/api/contatos](http://localhost:3000/api/contatos)  
- 🔗 **MySQL:** Porta 3306

---

## 🔗 API - Endpoints

| Método | Rota                    | Descrição                    |
|--------|--------------------------|------------------------------|
| GET    | `/api/contatos`          | Listar todos os contatos     |
| GET    | `/api/contatos/:id`      | Buscar contato por ID        |
| POST   | `/api/contatos`          | Criar um novo contato        |
| PUT    | `/api/contatos/:id`      | Atualizar um contato         |
| DELETE | `/api/contatos/:id`      | Deletar um contato           |

### 🔸 Exemplo de JSON para POST e PUT:

```json
{
  "nome": "João Silva",
  "telefone": "31999999999",
  "cep": "30140071",
  "endereco": "Rua A",
  "bairro": "Centro",
  "cidade": "Belo Horizonte",
  "estado": "MG"
}
```

---

## 🗄️ Banco de Dados

- Banco: `agenda`  
- Tabela: `contatos`  

O banco é criado automaticamente via o script `init.sql` na pasta `/database`.

---

## 🐳 Comandos úteis

- Subir containers:

```bash
docker-compose up --build
```

- Derrubar containers:

```bash
docker-compose down
```

- Ver containers rodando:

```bash
docker ps
```

---

## ✍️ Autor

Projeto desenvolvido por **Natanael Leão**, para fins de estudo no curso de Desenvolvimento de Sistemas. 💻📚

---