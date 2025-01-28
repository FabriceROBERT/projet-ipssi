const connect = require("../../server/config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signIn = async (req, res) => {
  console.log("Requête reçue avec les données :", req.body); // Vérifie les données envoyées par le client

  const { email, password } = req.body;

  // Validation des champs obligatoires
  if (!email || !password) {
    console.warn("Champs manquants : email ou mot de passe absent");
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // Requête SQL pour récupérer l'utilisateur par email
  try {
    const conn = await connect.pool.getConnection();
    console.log("Connexion à la base de données établie");

    const result = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!result[0].length) {
      console.warn(`Utilisateur non trouvé pour l'email : ${email}`);
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    const user = result[0][0];

    // Comparaison du mot de passe fourni avec le mot de passe stocké
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Résultat de la comparaison de mot de passe :", passwordMatch);

    if (!passwordMatch) {
      console.warn(`Mot de passe incorrect pour l'email : ${email}`);
      return res.status(401).json({ error: "Identifiants incorrects." });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ApiKEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, message: "Connexion réussie !" });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err.message);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};
