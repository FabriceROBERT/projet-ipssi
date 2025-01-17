const mysql = require("mysql2");
require("dotenv").config();

// Création de la connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Quitter le processus en cas d'erreur
  } else {
    console.log("Successfully connected to the database");
  }
});

module.exports = db;
