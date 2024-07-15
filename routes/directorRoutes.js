const express = require('express');
const directorController = require('../controllers/directorController');
const router = express.Router();

router
  .route('/')
  .get(directorController.getAllDirectors)
  .post(directorController.createDirector);

router
  .route('/:id')
  .get(directorController.getDirector)
  .patch(directorController.updateDirector)
  .delete(directorController.deleteDirector);

module.exports = router;
