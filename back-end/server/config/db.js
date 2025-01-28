const mysql = require("mysql2/promise");
require("dotenv").config();

// Création d'un pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Limite du nombre de connexions simultanées
  queueLimit: 0, // Pas de limite pour la file d'attente
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    // Quitte le processus si la connexion échoue
    process.exit(1);
  }
  if (connection) {
    console.log("Successfully connected to the database");
    connection.release();
  }
});

module.exports = { pool: pool };
