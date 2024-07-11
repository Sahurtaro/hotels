const express = require('express');
const morgan = require('morgan');
const hotelRouter = require('./routes/hotelRoutes');
const userRouter = require('./routes/userRoutes');
const trainingRouter = require('./routes/trainingRoutes');
const providerRouter = require('./routes/providerRoutes');
const destinationRouter = require('./routes/destinationRoutes');

const app = express();

//1) Middlewares
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json()); //the data from the boddy is added to the request object using this middleware

// app.get('/api/v1/hotels', getAllHotels);
// app.get('/api/v1/hotels/:id', getHotel);
// app.post('/api/v1/hotels', createHotel);
// app.patch('/api/v1/hotels/:id', updateHotel);
// app.delete('/api/v1/hotels/:id', deleteHotel);

//3) Routes

//this is called "mounting the router"
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/trainings', trainingRouter);
app.use('/api/v1/providers', providerRouter);
app.use('/api/v1/destinations', destinationRouter);

module.exports = app;
