const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'crittrly',
    password: 'Test123!',
    database: 'crittrly_db'
});

db.connect((err) => {
    if (err){
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('Connected to databse');
});
module.exports = db;