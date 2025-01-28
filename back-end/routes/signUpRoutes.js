const express = require("express");
const router = express.Router();

const signUpController = require("../controller/connection/signUpController");

/**===================
 *         POST
======================*/
router.post("/signup", signUpController.signUp);

module.exports = router;
