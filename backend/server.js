
// Just note that the example backend is not using 'await' therefore not using multi threading

// we should aim to use multi threading
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const path = require('path');

const resourceRouter = require('./routes/resources');
const forumRouter = require('./routes/forum');
const adoptionRouter = require('./routes/adoption');

const app = express();
const PORT = 8080;

//MYSQL connection pool
const db = mysql.createPool({
    host: "localhost",
    user:"crittrly",
    password: "Test123!",
    database: "crittrly_db"
}).promise();


app.use(cors()); //allows frontend on different port to connect
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/resources', resourceRouter); //all routes starting with /api/resources go here
app.use('/api/forum', forumRouter);
app.use('/adoption-posts', adoptionRouter);

module.exports.db = db;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

db.getConnection()
  .then(conn => {
    console.log('Connected to MySQL!');
    conn.release();  // release back to pool
  })
  .catch(err => {
    console.error('MySQL connection error:', err);
  });
