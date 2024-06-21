//Route handlers
exports.getAllHotels = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: hotels.length,
    data: { hotels: hotels },
  });
};

exports.getHotel = (req, res) => {
  console.log(req.params);
  res.status(200).json({ status: 'success', data: {} });
};

exports.createHotel = (req, res) => {
  console.log(req.body);
  res.send('Done');
};

exports.updateHotel = (req, res) => {
  console.log(`Updated hotel`);
  const hotelId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      hotel: '<Updated hotel here>',
    },
  });
};

exports.deleteHotel = (req, res) => {
  console.log(`deleted hotel`);
  const hotelId = req.params.id;
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
