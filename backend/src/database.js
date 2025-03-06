const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'mysql_agenda',  // Nome do serviço no Docker
    user: 'root',
    password: 'root',
    database: 'agenda',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
