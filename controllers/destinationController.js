const Destination = require('./../models/destinationModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllDestinations = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { destination } });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createDestination = async (req, res) => {
  try {
    const newDestination = await Destination.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        provider: newDestination,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: 'success',
      data: {
        destination,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
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
