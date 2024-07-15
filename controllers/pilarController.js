const Pilar = require('./../models/pilarModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllPilars = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getPilar = async (req, res) => {
  try {
    const pilar = await Pilar.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { pilar } });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createPilar = async (req, res) => {
  try {
    const newPilar = await Pilar.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        hotel: newPilar,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updatePilar = async (req, res) => {
  try {
    const pilar = await Pilar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        pilar,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deletePilar = async (req, res) => {
  try {
    await Pilar.findByIdAndDelete(req.params.id);
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
