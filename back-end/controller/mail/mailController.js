const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

exports.sendInvoice = async (req, res) => {
  try {
    const { email } = req.body;
    const invoicePath = req.file.path;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Votre facture",
      text: "Bonjour, voici votre facture en pièce jointe.",
      attachments: [{ filename: req.file.originalname, path: invoicePath }],
    };

    await transporter.sendMail(mailOptions);
    fs.unlinkSync(invoicePath); // Supprime la facture après envoi

    res.status(200).json({ message: "Facture envoyée avec succès" });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi" });
  }
};
