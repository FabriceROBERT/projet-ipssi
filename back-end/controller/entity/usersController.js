const pool = require("../../server/config/db"); // Importez le pool de connexions
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//  Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    console.log("query running....");

    const [rows] = await pool.promise().query("SELECT * FROM users");

    res.status(200).json(rows); // Retourne les utilisateurs
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer un utilisateur par son ID
exports.getUserById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    console.log("query running....");
    const rows = await connect.pool.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.log("erreur", error);
  }
};
