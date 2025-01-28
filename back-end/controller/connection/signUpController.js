const connect = require("../../server/config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
  const { lastName, firstName, company, address, email, password } = req.body;

  // Validation des champs
  if (!lastName || !firstName || !email || !password || !address || !company) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }

  try {
    // Vérifie si l'utilisateur existe déjà
    const [existingUser] = await connect.pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "L'utilisateur existe déjà." });
    }

    // Hashage du mot de passe
    const hash = await bcrypt.hash(password, 10);

    // Insère le nouvel utilisateur et récupère l'ID inséré
    const [result] = await connect.pool.query(
      "INSERT INTO users (lastName, firstName, email, password, company, address) VALUES (?, ?, ?, ?, ?, ?)",
      [lastName, firstName, email, hash, company, address]
    );
    const Id = result.insertId; // Récupération de l'ID inséré

    // Génère un token JWT avec l'ID de l'utilisateur
    const token = jwt.sign({ id: Id, email }, process.env.ApiKEY, {
      expiresIn: "1h",
    });

    // Réponse avec l'ID et le token
    res.status(201).json({
      status: "success",
      data: {
        id: Id,
        token: token,
      },
      message: "Inscription réussie !",
    });
  } catch (error) {
    console.error("Erreur pendant l'inscription :", error);

    // En fonction de l'erreur, renvoie un message d'erreur plus spécifique
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "L'utilisateur existe déjà. Veuillez utiliser un autre email.",
      });
    }

    // Erreur générale
    res.status(500).json({
      error: "Une erreur est survenue, veuillez réessayer plus tard.",
    });
  }
};
