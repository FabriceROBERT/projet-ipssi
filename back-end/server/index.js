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
const mailRoutes = require("../routes/mailRoutes.js");
const subscriptionsRoutes = require("../routes/subscriptionsRoutes.js");
const filesRoutes = require("../routes/filesRoutes");
app.use(cors());
app.use(express.json());

// Routes de API accessibles du côté client localhost:5000/
app.use("/api/", usersRoutes); // Lier les routes utilisateurs à /api/users
app.use("/api/", signUpRoutes); // Lie les routes d'authentification à /api/signup
app.use("/api/", signInRoutes); // Lie les routes d'authentification à /api/signin
app.use("/api/", invoicesRoutes); // Lie les routes de factures à /api/invoices
app.use("/api/", subscriptionsRoutes); // Lier les routes de factures à /api/subscriptions
app.use("/api/mail/", mailRoutes); // Envpoyer un mail
app.use("/api/", filesRoutes); // Lie les routes de fichiers à /api/files

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
