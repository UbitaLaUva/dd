const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

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

app.get("/validate", (req, res) => { 
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ valid: false, message: "Key requerida" });
  }

  const sql = "SELECT * FROM keys WHERE key_value = ? AND expiration > NOW()";
  db.query(sql, [key], (err, result) => {
    if (err) {
      console.error("Error en la validación de la key:", err);
      return res.status(500).json({ valid: false, message: err.message });
    }
    if (result.length > 0) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});