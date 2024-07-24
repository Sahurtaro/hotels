const Director = require('./../models/directorModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllDirectors = catchAsync(async (req, res, next) => {
  //Execute query
  const features = new APIFeatures(Director.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const directors = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    results: directors.length,
    data: { directors },
  });
});

exports.getDirector = catchAsync(async (req, res, next) => {
  const director = await Director.findById(req.params.id, (err) => {
    if (err) {
      return next(new AppError(`No valid ID ${req.params.id}`, 404));
    }
  });
  if (!director) {
    return next(
      new AppError(`No director found with that ID ${req.params.id}`, 404),
    );
  }
  res.status(200).json({ status: 'success', data: { director } });
});

exports.createDirector = catchAsync(async (req, res, next) => {
  const newDirector = await Director.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      hotel: newDirector,
    },
  });
});

exports.updateDirector = catchAsync(async (req, res, next) => {
  const director = await Director.findByIdAndUpdate(
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

  if (!director) {
    return next(new AppError('No director found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      director,
    },
  });
});

exports.deleteDirector = catchAsync(async (req, res, next) => {
  const director = await Director.findByIdAndDelete(req.params.id);

  if (!director) {
    return next(new AppError('No director found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
