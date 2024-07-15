const Director = require('./../models/directorModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllDirectors = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDirector = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { director } });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createDirector = async (req, res) => {
  try {
    const newDirector = await Director.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        provider: newDirector,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        director,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteDirector = async (req, res) => {
  try {
    await Director.findByIdAndDelete(req.params.id);
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
