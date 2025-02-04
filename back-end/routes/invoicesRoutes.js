const express = require("express");
const router = express.Router();

const invoicesController = require("../controller/entity/invoicesController");
const middleware = require("../server/middleware/middleware");

/**===================
 *         GET
======================*/

// Récupére toutes les factures
router.get(
  "/invoices",
  middleware.authenticator,
  invoicesController.getInvoices
);

router.get(
  "/invoices/user/:userId",
  middleware.authenticator,
  invoicesController.getInvoicesByUserId
);

// Récupére une facture par son ID
router.get(
  "/invoices/:id",
  middleware.authenticator,
  invoicesController.getInvoiceById
);

/**===================
 *         POST
======================*/

// Ajoute une nouvelle facture
router.post(
  "/invoices",
  middleware.authenticator,
  invoicesController.addInvoice
);

/**===================
 *         PUT
======================*/

// Mettre à jour une facture par son ID
router.put(
  "/invoices/:id",
  middleware.authenticator,
  invoicesController.updateInvoice
);

/**===================
 *         DELETE
======================*/

// Supprime une facture par son ID
router.delete("/invoices/:id", invoicesController.deleteInvoice);

module.exports = router;
