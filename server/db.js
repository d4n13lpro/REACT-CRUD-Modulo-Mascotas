// Importar el módulo 'mysql' y 'dotenv'
import mysql from "mysql2/promise";
import { config as configDotenv } from "dotenv";

// Configurar las variables de entorno con dotenv
configDotenv();

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar al servidor de base de datos al inicio de la aplicación
pool.getConnection()
  .then((connection) => {
    console.log(`Conectado a la base de datos ${process.env.DB_NAME}`);
    connection.release();
  })
  .catch((err) => {
    console.error(`Error de conexión con la base de datos ${process.env.DB_NAME}`, err.stack);
  });

// Exportar el pool de conexiones
export default pool;
