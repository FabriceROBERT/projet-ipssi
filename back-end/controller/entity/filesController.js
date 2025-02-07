const { pool } = require("../../server/config/db");
const fs = require("fs");
const path = require("path");

// Upload d'un fichier
exports.uploadFile = async (req, res) => {
  try {
    // Vérifie si le fichier est présent dans `req.file`
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier sélectionné" });
    }

    const { originalname, mimetype, size, filename } = req.file;
    const userId = req.body.userId;

    // Enregistrement du fichier en base de données
    await pool.execute(
      "INSERT INTO files (userId, fileName, filePath, fileSize, fileType) VALUES (?, ?, ?, ?, ?)",
      [userId, originalname, `/uploads/${filename}`, size, mimetype]
    );

    // Réponse de succès
    res.status(200).json({
      message: "Fichier uploadé avec succès",
      file: req.file,
    });
  } catch (error) {
    console.error("Erreur lors de l'upload :", error);
    res.status(500).json({
      message: "Erreur lors de l'upload du fichier",
      error: error.message,
    });
  }
};
// Lors de la récupération des fichiers d'un utilisateur
exports.getUserFiles = async (req, res) => {
  try {
    const { userId } = req.params;
    const [files] = await pool.execute("SELECT * FROM files WHERE userId = ?", [
      userId,
    ]);
    res.status(200).json(files);
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des fichiers" });
  }
};

// Suppression d'un fichier
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer le fichier à supprimer
    const [file] = await pool.execute(
      "SELECT filePath FROM files WHERE id = ?",
      [id]
    );
    if (!file.length)
      return res.status(404).json({ message: "Fichier non trouvé" });

    // Supprimer le fichier du système
    const filePath = path.join(__dirname, "..", file[0].filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Fichier supprimé :", filePath);
    } else {
      console.warn("Fichier introuvable sur le disque :", filePath);
    }

    // Supprimer de la base de données
    await pool.execute("DELETE FROM files WHERE id = ?", [id]);

    res.status(200).json({ message: "Fichier supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};
