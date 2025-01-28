const { pool } = require("../../server/config/db");

/**===================
 *         GET
======================*/

// Récupére toutes les factures
exports.getInvoices = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM invoices");
    res.status(200).json(rows); // Retourne les factures
  } catch (error) {
    console.error("Erreur lors de la récupération des factures :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des factures." });
  }
};

// Récupére toutes les factures d'un client par son userId
exports.getInvoicesByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "ID utilisateur invalide." });
  }

  try {
    console.log(`Récupération des factures pour l'utilisateur ${userId}...`);
    const [rows] = await pool.query("SELECT * FROM invoices WHERE userId = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune facture trouvée pour cet utilisateur." });
    }

    res.status(200).json(rows); // Retourne toutes les factures pour le client
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des factures pour l'utilisateur ${userId} :`,
      error
    );
    res.status(500).json({
      message:
        "Erreur lors de la récupération des factures pour cet utilisateur.",
    });
  }
};

// Récupérer une facture par son ID
exports.getInvoiceById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID de facture invalide." });
  }

  try {
    console.log("Récupération d'une facture...");
    const [rows] = await pool.query("SELECT * FROM invoices WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Facture non trouvée." });
    }

    res.status(200).json(rows[0]); // Retourne la facture trouvée
  } catch (error) {
    console.error("Erreur lors de la récupération de la facture :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la facture." });
  }
};

/**===================
 *         POST
======================*/

// Ajoute une nouvelle facture
exports.addInvoice = async (req, res) => {
  const {
    userId,
    quantity = 1,
    pricePerUnit = 20.0,
    totalHt = 16,
    tax = 20,
    totalTtc = 20,
  } = req.body;

  // Vérifie les champs obligatoires
  if (!userId || !totalHt || !tax || !totalTtc) {
    return res
      .status(400)
      .json({ message: "Certains champs obligatoires sont manquants." });
  }

  try {
    console.log("Ajout d'une nouvelle facture...");
    const [result] = await pool.query(
      "INSERT INTO invoices (userId, quantity, pricePerUnit, totalHt, tax, totalTtc) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, quantity, pricePerUnit, totalHt, tax, totalTtc]
    );

    res.status(201).json({
      message: "Facture ajoutée avec succès.",
      invoiceId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la facture :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de la facture." });
  }
};

/**===================
 *         PUT
======================*/

// Modifie une facture existante
exports.updateInvoice = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    userId,
    itemDescription,
    quantity,
    pricePerUnit,
    totalHt,
    tax,
    totalTtc,
  } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID de facture invalide." });
  }

  if (!userId || !itemDescription || !totalHt || !tax || !totalTtc) {
    return res
      .status(400)
      .json({ message: "Certains champs obligatoires sont manquants." });
  }

  try {
    console.log("Mise à jour d'une facture...");
    const [result] = await pool
      .promise()
      .query(
        "UPDATE invoices SET userId = ?, itemDescription = ?, quantity = ?, pricePerUnit = ?, totalHt = ?, tax = ?, totalTtc = ? WHERE id = ?",
        [
          userId,
          itemDescription,
          quantity,
          pricePerUnit,
          totalHt,
          tax,
          totalTtc,
          id,
        ]
      );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Facture non trouvée." });
    }

    res.status(200).json({ message: "Facture mise à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la facture :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la facture." });
  }
};

/**===================
 *         DELETE
======================*/

// Supprime une facture par son ID
exports.deleteInvoice = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID de facture invalide." });
  }

  try {
    console.log("Suppression d'une facture...");
    const [result] = await pool
      .promise()
      .query("DELETE FROM invoices WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Facture supprimée avec succès." });
    } else {
      res.status(404).json({ message: "Facture non trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la facture :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la facture." });
  }
};
