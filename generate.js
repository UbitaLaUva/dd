const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "193.203.166.109",
  user: "u972882902_2B8UOLu7hm8V",
  password: "kU]9=@a#",
  database: "u972882902_keySistem"
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos");
});

function generateKey() {
  return crypto.randomBytes(16).toString("hex");
}

app.get("/generate", (req, res) => {
  const key = generateKey();
  const expiration = new Date(Date.now() + 12 * 60 * 60 * 1000) // 12 horas
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const sql = "INSERT INTO keys (key_value, expiration) VALUES (?, ?)";
  db.query(sql, [key, expiration], (err, result) => {
    if (err) {
      console.error("Error al insertar la key:", err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ key: key });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});