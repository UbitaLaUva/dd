const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


db.connect();

app.get("/", (req, res) => {
  const { key } = req.query;
  const sql = "SELECT * FROM keys WHERE key_value = ? AND expiration > NOW()";

  db.query(sql, [key], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length > 0) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  });
});

module.exports = app;
