const express = require('express');
const hotelController = require('../controllers/hotelController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(authController.protect, hotelController.getAllHotels)
  .post(hotelController.createHotel);

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.getHotel,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.updateHotel,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.deleteHotel,
  );

module.exports = router;
