const express = require('express');

const app = express();

app.use(express.json()); //the data from the boddy is added to the request object using this middleware

const hotels = [
  {
    name: 'Hotel1',
    region: 'suroccidente',
    city: 'cali',
    zone: 'centro',
    category: 'hotel',
    stars: 4,
    type: 'urbano',
    web: 'hotel1.com',
    image: 'www.imagen.png',
    address: 'calle 1 con carrera 2 num 123',
    location: {
      lat: 424,
      lng: 963,
    },
  },
];

app.get('/api/v1/hotels', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: hotels.length,
    data: { hotels: hotels },
  });
});

app.get('/api/v1/hotels/:id', (req, res) => {
  console.log(req.params);
  res.status(200).json({ status: 'success', data: {} });
});

app.post('/api/v1/hotels', (req, res) => {
  console.log(req.body);
  res.send('Done');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
