const express = require("express");
const router = express.Router();

const usersController = require("../controller/entity/usersController");

/**===================
 *         GET
======================*/

// Route pour récupérer tous les utilisateurs
router.get("/users", usersController.getUsers);
// Route pour récupérer un utilisateur par son ID
router.get("/users/:id", usersController.getUserById);

/**===================
 *         POST
======================*/

module.exports = router;
