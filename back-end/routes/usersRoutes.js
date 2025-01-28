const express = require("express");
const router = express.Router();
const middleware = require("../server/middleware/middleware");

const usersController = require("../controller/entity/usersController");

/**===================
 *         GET
======================*/

// Route pour récupérer tous les utilisateurs
router.get("/users", middleware.authenticator, usersController.getUsers);
// router.get("/users", usersController.getUsers);
// Route pour récupérer un utilisateur par son ID
router.get("/users/:id", middleware.authenticator, usersController.getUserById);

/**===================
 *         POST
======================*/

router.post("/delete", usersController.deleteUsers);
module.exports = router;
