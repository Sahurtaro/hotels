const express = require('express');
const pilarController = require('../controllers/pilarController');
const router = express.Router();

router
  .route('/')
  .get(pilarController.getAllPilars)
  .post(pilarController.createPilar);

router
  .route('/:id')
  .get(pilarController.getPilar)
  .patch(pilarController.updatePilar)
  .delete(pilarController.deletePilar);

module.exports = router;
