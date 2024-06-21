const express = require('express');
const morgan = require('morgan');

const app = express();

//1) Middlewares
app.use(morgan('tiny'));
app.use(express.json()); //the data from the boddy is added to the request object using this middleware

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

//2)Route handlers
const getAllHotels = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: hotels.length,
    data: { hotels: hotels },
  });
};

const getHotel = (req, res) => {
  console.log(req.params);
  res.status(200).json({ status: 'success', data: {} });
};

const createHotel = (req, res) => {
  console.log(req.body);
  res.send('Done');
};

const updateHotel = (req, res) => {
  console.log(`Updated hotel`);
  const hotelId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      hotel: '<Updated hotel here>',
    },
  });
};

const deleteHotel = (req, res) => {
  console.log(`deleted hotel`);
  const hotelId = req.params.id;
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// app.get('/api/v1/hotels', getAllHotels);
// app.get('/api/v1/hotels/:id', getHotel);
// app.post('/api/v1/hotels', createHotel);
// app.patch('/api/v1/hotels/:id', updateHotel);
// app.delete('/api/v1/hotels/:id', deleteHotel);

//3) Routes

app.route('/api/v1/hotels').get(getAllHotels).post(createHotel);
app
  .route('/api/v1/hotels/:id')
  .get(getHotel)
  .patch(updateHotel)
  .delete(deleteHotel);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//4) Start server
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
