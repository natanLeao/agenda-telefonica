const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql_agenda',
  user: 'root',
  password: 'root',
  database: 'agenda_telefonica',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
 