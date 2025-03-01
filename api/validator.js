const express = require("express");
const mysql = require("mysql");
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
