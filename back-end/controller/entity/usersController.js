const { pool } = require("../../server/config/db");

// Récupére tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    console.log("query running....");

    const [rows] = await pool.query("SELECT * FROM users");

    res.status(200).json(rows); // Retourne les utilisateurs
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupére un utilisateur par son ID
exports.getUserById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    console.log("query running....");

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(rows[0]); // Retourne l'utilisateur trouvé
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprime un utilisateur
exports.deleteUsers = async (req, res) => {
  const email = req.params.email;
  try {
    const result = await pool.query("DELETE FROM `users` WHERE email = ?", [
      email,
    ]);

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ success: "Opération réussie. L'utilisateur a été supprimé." });
    } else {
      res
        .status(404)
        .json({ error: "Aucun utilisateur trouvé avec cet email." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Erreur interne du serveur. Veuillez réessayer." });
  }
};
