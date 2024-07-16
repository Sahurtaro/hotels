const express = require('express');
const morgan = require('morgan');
const hotelRouter = require('./routes/hotelRoutes');
const userRouter = require('./routes/userRoutes');
const trainingRouter = require('./routes/trainingRoutes');
const providerRouter = require('./routes/providerRoutes');
const destinationRouter = require('./routes/destinationRoutes');
const pilarRouter = require('./routes/pilarRoutes');
const directorRouter = require('./routes/directorRoutes');

const app = express();

//1) Middlewares
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json()); //the data from the boddy is added to the request object using this middleware

//3) Routes

//this is called "mounting the router"
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/trainings', trainingRouter);
app.use('/api/v1/providers', providerRouter);
app.use('/api/v1/destinations', destinationRouter);
app.use('/api/v1/pilars', pilarRouter);
app.use('/api/v1/directors', directorRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl} on this server`,
  });
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
