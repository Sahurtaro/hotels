const Pilar = require('./../models/pilarModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPilars = catchAsync(async (req, res, next) => {
  //Execute query
  const features = new APIFeatures(Pilar.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const pilars = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    results: pilars.length,
    data: { pilars },
  });
});

exports.getPilar = catchAsync(async (req, res, next) => {
  const pilar = await Pilar.findById(req.params.id, (err) => {
    if (err) {
      return next(new AppError(`No valid ID ${req.params.id}`, 404));
    }
  });
  if (!pilar) {
    return next(
      new AppError(`No pilar found with that ID ${req.params.id}`, 404),
    );
  }
  res.status(200).json({ status: 'success', data: { pilar } });
});

exports.createPilar = catchAsync(async (req, res, next) => {
  const newPilar = await Pilar.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      hotel: newPilar,
    },
  });
});

exports.updatePilar = catchAsync(async (req, res, next) => {
  const pilar = await Pilar.findByIdAndUpdate(
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

  if (!pilar) {
    return next(new AppError('No pilar found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      pilar,
    },
  });
});

exports.deletePilar = catchAsync(async (req, res, next) => {
  const pilar = await Pilar.findByIdAndDelete(req.params.id);

  if (!pilar) {
    return next(new AppError('No pilar found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
