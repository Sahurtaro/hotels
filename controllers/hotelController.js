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
    const hotels = await Hotel.find();
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
