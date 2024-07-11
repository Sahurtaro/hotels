const express = require('express');
const providerController = require('./../controllers/providerController');
const router = express.Router();

router
  .route('/')
  .get(providerController.getAllProviders)
  .post(providerController.createProvider);

router
  .route('/:id')
  .get(providerController.getProvider)
  .patch(providerController.updateProvider)
  .delete(providerController.deleteProvider);

module.exports = router;
