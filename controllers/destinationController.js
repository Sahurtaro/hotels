const Destination = require('./../models/destinationModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllDestinations = catchAsync(async (req, res, next) => {
  //Execute query
  const features = new APIFeatures(Destination.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const destinations = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    results: destinations.length,
    data: { destinations },
  });
});

exports.getDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findById(req.params.id, (err) => {
    if (err) {
      return next(new AppError(`No valid ID ${req.params.id}`, 404));
    }
  });
  if (!destination) {
    return next(
      new AppError(`No destination found with that ID ${req.params.id}`, 404),
    );
  }
  res.status(200).json({ status: 'success', data: { destination } });
});

exports.createDestination = catchAsync(async (req, res, next) => {
  const newDestination = await Destination.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      destination: newDestination,
    },
  });
});

exports.updateDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
    (err) => {
      if (err) {
        return next(new AppError(`No valid ID ${req.params.id}`, 404));
      }
    },
  );

  if (!destination) {
    return next(new AppError('No destination found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      destination,
    },
  });
});

exports.deleteDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findByIdAndDelete(req.params.id);

  if (!destination) {
    return next(new AppError('No destination found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
