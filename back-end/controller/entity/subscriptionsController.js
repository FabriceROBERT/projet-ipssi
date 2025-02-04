const { pool } = require("../../server/config/db");

/**===================
 *         GET
======================*/

// Récupére toutes les abonnements
exports.getSubscriptions = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM subscriptions");
    res.status(200).json(rows); // Retourne les abonnements
  } catch (error) {
    console.error("Erreur lors de la récupération des abonnements :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des abonnements." });
  }
};

// Récupére un abonnement par son ID
exports.getSubscriptionById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID d'abonnement invalide." });
  }
  try {
    const [rows] = await pool.query(
      "SELECT * FROM subscriptions WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun abonnement trouvé avec cet ID." });
    }

    res.status(200).json(rows[0]); // Retourne l'abonnement trouvé
  } catch (error) {
    console.error("Erreur lors de la récupération de l'abonnement :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**===================
 *         POST
======================*/

exports.createSubscription = async (req, res) => {
  const { userId, storageSize, price, purchaseDate, invoiceId } = req.body;
  console.log(
    "Données de l'abonnement à créer :",
    userId,
    storageSize,
    price,
    purchaseDate,
    invoiceId
  );

  if (!userId || !storageSize || !price || !purchaseDate || !invoiceId) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO subscriptions (userId, storageSize, price, purchaseDate, invoiceId) VALUES (?, ?, ?, ?, ?)",
      [userId, storageSize, price, purchaseDate, invoiceId]
    );
    res.status(201).json({
      id: result.insertId,
      userId,
      storageSize,
      price,
      purchaseDate,
      invoiceId,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'abonnement :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
