const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticator = (req, res, next) => {
  const authHeader = req.headers.authorization || req.query.token;

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }
  // Si le token est dans le header Authorization avec "Bearer"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  jwt.verify(token, process.env.ApiKEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token invalide", error: err.message });
    }
    // Ajoute les informations décodées
    next();
  });
};
