const express = require("express");
const mysql = require("mysql");
const crypto = require("crypto");
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
  const key = crypto.randomBytes(16).toString("hex");
  const expiration = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 horas
  const sql = "INSERT INTO keys (key_value, expiration) VALUES (?, ?)";

  db.query(sql, [key, expiration], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ key });
  });
});

module.exports = app;
