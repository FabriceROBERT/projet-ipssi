const mysql = require("mysql");
// Secrurisation des données sensibles
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Attendre une connexion disponible
  connectionLimit: 10, // Limiter le nombre de connexions
  queueLimit: 0, // Pas de limite dans la file d'attente
});

module.exports = db;
