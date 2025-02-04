const express = require("express");
const router = express.Router();
const upload = require("../server/middleware/upload/upload"); // Middleware Multer si nécessaire
const { sendInvoice } = require("../controller/mail/mailController");

// Route pour envoyer une facture
router.post("/send-invoice", upload.single("invoice"), sendInvoice);

module.exports = router;
