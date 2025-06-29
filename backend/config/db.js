const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'crittrly',
    password: 'Test123!',
    database: 'crittrly_db'
}).promise();

module.exports = db;