const Provider = require('./../models/providerModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllProviders = catchAsync(async (req, res, next) => {
  //Execute query
  const features = new APIFeatures(Provider.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const providers = await features.query;

  //Send response
  res.status(200).json({
    status: 'success',
    results: providers.length,
    data: { providers },
  });
});

exports.getProvider = catchAsync(async (req, res, next) => {
  const provider = await Provider.findById(req.params.id, (err) => {
    if (err) {
      return next(new AppError(`No valid ID ${req.params.id}`, 404));
    }
  });
  if (!provider) {
    return next(
      new AppError(`No provider found with that ID ${req.params.id}`, 404),
    );
  }
  res.status(200).json({ status: 'success', data: { provider } });
});

exports.createProvider = catchAsync(async (req, res, next) => {
  const newProvider = await Provider.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      provider: newProvider,
    },
  });
});

exports.updateProvider = catchAsync(async (req, res, next) => {
  const provider = await Provider.findByIdAndUpdate(
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

  if (!provider) {
    return next(new AppError('No provider found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      provider,
    },
  });
});

exports.deleteProvider = catchAsync(async (req, res, next) => {
  const provider = await Provider.findByIdAndDelete(req.params.id);

  if (!provider) {
    return next(new AppError('No provider found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
