const express = require("express");
const router = express.Router();
const upload = require("../server/middleware/upload/upload");
const filesController = require("../controller/entity/filesController");

// Route pour uploader un fichier (Ajout de Multer)
router.post("/upload", upload.single("file"), filesController.uploadFile);

// Route pour récupérer les fichiers d'un utilisateur
router.get("/user/:userId", filesController.getUserFiles);

// Route pour télécharger un fichier (Ajout de la récupération)
// router.get("/download/:id", filesController.downloadFile);

// Route pour supprimer un fichier
router.delete("/:id", filesController.deleteFile);

module.exports = router;
