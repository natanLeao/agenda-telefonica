
const express = require('express');
const cors = require('cors');
const contactsRouter = require('./routes/contacts');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', contactsRouter);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
