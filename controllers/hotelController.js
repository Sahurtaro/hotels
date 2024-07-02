const Hotel = require('./../models/hotelModel');

//Route handlers

// const hotels = [
//   {
//     id: 1,
//     name: 'Hotel1',
//     region: 'suroccidente',
//     city: 'cali',
//     zone: 'centro',
//     category: 'hotel',
//     stars: 4,
//     type: 'urbano',
//     web: 'hotel1.com',
//     image: 'www.imagen.png',
//     address: 'calle 1 con carrera 2 num 123',
//     location: {
//       lat: 424,
//       lng: 963,
//     },
//   },
// ];

exports.getAllHotels = async (req, res) => {
  try {
    //Build query
    //1A) Filtering
    const queryObj = { ...req.query };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    //1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Hotel.find(JSON.parse(queryStr));

    //2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').joint(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numHotels = await Hotel.countDocuments();
      if (skip >= numHotels) throw new Error('This page does not exist');
    }

    //Execute query
    const hotels = await query;

    //Send response
    res.status(200).json({
      status: 'success',
      results: hotels.length,
      data: { hotels },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { hotel } });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createHotel = async (req, res) => {
  try {
    const newHotel = await Hotel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        hotel: newHotel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        hotel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
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
