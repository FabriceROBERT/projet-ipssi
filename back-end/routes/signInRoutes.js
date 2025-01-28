const express = require("express");
const router = express.Router();

const signInController = require("../controller/connection/signInController");

/**===================
 *         POST
======================*/
router.post("/signin", signInController.signIn);

module.exports = router;
