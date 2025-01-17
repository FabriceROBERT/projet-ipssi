const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();

// Port du serveur
const PORT = process.env.PORT || 5000;

// Déclaration des routes API
const usersRoutes = require("../routes/usersRoutes.js");

// Utilisation de CORS et de JSON
app.use(cors());
app.use(express.json());

// Route de test
app.use("/api", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Enregistrement des routes dans l'application
app.use("/api/users", usersRoutes); // Lier les routes utilisateurs à /api/users

// Demarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Connexion à la base de données
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1); // Arrêter le serveur si la connexion échoue
    } else {
      console.log("Connected to the database");
    }
  });
});
