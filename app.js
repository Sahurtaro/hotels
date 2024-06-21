const express = require('express');
const morgan = require('morgan');
const hotelRouter = require('./routes/hotelRoutes');
const userRouter = require('./routes/userRoutes');

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

// app.get('/api/v1/hotels', getAllHotels);
// app.get('/api/v1/hotels/:id', getHotel);
// app.post('/api/v1/hotels', createHotel);
// app.patch('/api/v1/hotels/:id', updateHotel);
// app.delete('/api/v1/hotels/:id', deleteHotel);

//3) Routes

//this is called "mounting the router"
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
