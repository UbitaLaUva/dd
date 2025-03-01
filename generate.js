const express = require("express");
const mysql = require("mysql");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "193.203.166.109",
  user: "u972882902_2B8UOLu7hm8V",
  password: "kU]9=@a#",
  database: "u972882902_keySistem"
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
