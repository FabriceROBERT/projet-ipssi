const express = require("express");
const router = express.Router();

const subscriptionsController = require("../controller/entity/subscriptionsController");
const middleware = require("../server/middleware/middleware");

/**===================
 *         GET
======================*/

// Récupére toutes les souscriptions
router.get(
  "/subscriptions",
  middleware.authenticator,
  subscriptionsController.getSubscriptions
);

/**===================
 *         POST
======================*/
router.post(
  "/subscriptions",
  middleware.authenticator,
  subscriptionsController.createSubscription
);

module.exports = router;
