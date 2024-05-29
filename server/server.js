// Importar los módulos necesarios
import express from "express";
import cors from "cors";
import path from "path";
import { config as configDotenv } from "dotenv";
import { fileURLToPath } from "url";
import pool from "./db.js";

// Configurar las variables de entorno con dotenv
configDotenv();

// Crear una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS y parsear el cuerpo de las solicitudes como JSON
app.use(cors());
app.use(express.json());

// Definir la ruta estática para servir los archivos de la aplicación cliente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/build")));

// Definir el punto de acceso de la API para obtener datos
app.get("/api/data", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM detalle_mascota");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener los datos:", err); // Registrar el error
    res.status(500).json({ error: err.message });
  }
});

// Definir el punto de acceso de la API para agregar una mascota
app.post("/add_mascota", async (req, res) => {
  const sql =
    "INSERT INTO detalle_mascota (nombre, especie, raza, edad, sexo, chip) VALUES (?, ?, ?, ?, ?, ?)";
  const { nombre, especie, raza, edad, sexo, chip } = req.body;

  // Validar si todos los campos requeridos están presentes
  if (!nombre || !especie || !raza || !edad || !sexo || !chip) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Ejecutar la consulta SQL para insertar una nueva mascota
    const [result] = await pool.query(sql, [nombre, especie, raza, edad, sexo, chip]);
    console.log("Mascota agregada exitosamente:", result);
    res.status(201).json({ success: true, message: "Mascota agregada exitosamente" });
  } catch (err) {
    console.error("Error al insertar mascota:", err); // Registrar el error
    res.status(500).json({ message: "Ha ocurrido algo inesperado" });
  }
});

// Definir el punto de acceso de la API para obtener la lista de mascotas
app.get('/mascotas', async (req, res) => {
  const sql = "SELECT * FROM detalle_mascota";

  try {
    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener las mascotas:', err); // Registrar el error
    res.status(500).json({ error: err.message });
  }
});

// Definir el punto de acceso de la API para obtener una mascota por ID
app.get('/get_mascota/:id', async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM detalle_mascota WHERE id = ?";
  try {
    const [rows] = await pool.query(sql, [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' });
    }
  } catch (err) {
    console.error('Error al obtener la mascota:', err); // Registrar el error
    res.status(500).json({ error: err.message });
  }
});

// Definir el punto de acceso de la API para actualizar una mascota por ID
app.put('/update_mascota/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, especie, raza, edad, sexo, chip } = req.body;
  const sql = "UPDATE detalle_mascota SET nombre = ?, especie = ?, raza = ?, edad = ?, sexo = ?, chip = ? WHERE id = ?";

  try {
    const [result] = await pool.query(sql, [nombre, especie, raza, edad, sexo, chip,id]);
    if (result.affectedRows > 0) {
      res.json({ success: "Mascota actualizada exitosamente" });
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' });
    }
  } catch (err) {
    console.error('Error al actualizar Mascota:', err); // Registrar el error
    res.status(500).json({ error: err.message });
  }
});

// Definir el punto de acceso de la API para eliminar un estudiante por ID
app.delete('/delete_mascota/:id', async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM detalle_mascota WHERE id = ?";

  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows > 0) {
      res.json({ success: "Mascota eliminada exitosamente" });
    } else {
      res.status(404).json({ message: 'Mascota no encontrada' });
    }
  } catch (err) {
    console.error('Error al eliminar mascota:', err); // Registrar el error
    res.status(500).json({ error: err.message });
  }
});












// Servir la aplicación React para cualquier otra ruta
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
