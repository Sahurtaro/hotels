const express = require('express');
const morgan = require('morgan');
const hotelRouter = require('./routes/hotelRoutes');
const userRouter = require('./routes/userRoutes');
const trainingRouter = require('./routes/trainingRoutes');
const providerRouter = require('./routes/providerRoutes');
const destinationRouter = require('./routes/destinationRoutes');
const pilarRouter = require('./routes/pilarRoutes');
const directorRouter = require('./routes/directorRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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
  next(new AppError(`Cant find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
