//Route handlers

const hotels = [
  {
    id: 1,
    name: 'Hotel1',
    region: 'suroccidente',
    city: 'cali',
    zone: 'centro',
    category: 'hotel',
    stars: 4,
    type: 'urbano',
    web: 'hotel1.com',
    image: 'www.imagen.png',
    address: 'calle 1 con carrera 2 num 123',
    location: {
      lat: 424,
      lng: 963,
    },
  },
];

exports.checkID = (req, res, next, val) => {
  console.log(`Hotel id is:${val}`);

  if (req.params.id * 1 > hotels.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

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
  this.checkID(req, res, next, val);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
