const Provider = require('./../models/providerModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllProviders = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { provider } });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createProvider = async (req, res) => {
  try {
    const newProvider = await Provider.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        provider: newProvider,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        provider,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    await Provider.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
