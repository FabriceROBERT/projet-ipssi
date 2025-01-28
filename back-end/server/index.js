const express = require("express");
const db = require("./config/db");
const cors = require("cors");
require("dotenv").config(); // Charger les variables d'environnement

const app = express();

// Port du serveur
const PORT = process.env.PORT;

// Déclaration des routes API
const usersRoutes = require("../routes/usersRoutes.js");
const signUpRoutes = require("../routes/signUpRoutes.js");
const signInRoutes = require("../routes/signInRoutes.js");
const invoicesRoutes = require("../routes/invoicesRoutes.js");
const { authenticator } = require("./middleware/middleware.js");
app.use(cors());
app.use(express.json());

// Routes de API accessibles du côté client localhost:5000/
app.use("/api/", usersRoutes); // Lier les routes utilisateurs à /api/users
app.use("/api/", signUpRoutes); // Lier les routes d'authentification à /api/signup
app.use("/api/", signInRoutes); // Lier les routes d'authentification à /api/signin
app.use("/api/", invoicesRoutes); // Lier les routes de factures à /api/invoices

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
