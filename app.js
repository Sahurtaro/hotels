const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

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

//1) GlobalMiddlewares

//Set Security HTTP headers
app.use(helmet());

// Development loggin
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

//Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

app.use('/api', limiter);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' })); //the data from the boddy is added to the request object using this middleware

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use;
hpp({
  whitelist: ['duration', 'category', 'zone', 'region'],
}),
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
