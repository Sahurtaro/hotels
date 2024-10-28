const Training = require('./../models/trainingModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllTrainings = catchAsync(async (req, res, next) => {
  //Execute query
  const features = new APIFeatures(Training.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const trainings = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    results: trainings.length,
    data: { trainings },
  });
});

exports.getTraining = catchAsync(async (req, res, next) => {
  const training = await Training.findById(req.params.id, (err) => {
    if (err) {
      return next(new AppError(`No valid ID ${req.params.id}`, 404));
    }
  });
  if (!training) {
    return next(
      new AppError(`No training found with that ID ${req.params.id}`, 404),
    );
  }
  res.status(200).json({ status: 'success', data: { training } });
});

exports.createTraining = catchAsync(async (req, res, next) => {
  const newTraining = await Training.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      provider: newTraining,
    },
  });
});

exports.updateTraining = catchAsync(async (req, res, next) => {
  const training = await Training.findByIdAndUpdate(
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

  if (!training) {
    return next(new AppError('No training found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      training,
    },
  });
});

exports.deleteTraining = catchAsync(async (req, res, next) => {
  const training = await Training.findByIdAndDelete(req.params.id);

  if (!training) {
    return next(new AppError('No provider found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
