const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

const app = express();
const port = 8080;
const host = "localhost";

// MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password here (create a user so that sensative info is not shared",
  database: "dbNameHere",
}).promise(); // to use asynchronous functions

app.locals.db = db; // needed for the db to be accessable

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // This will parse URL-encoded payloads (like from forms)


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});

module.exports = db;