const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const app = require('./app');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A hotel must have a name'],
  },
  city: String,
  region: String,
  zone: String,
  category: String,
  type: String,
  web: String,
  image: String,
  address: String,
  location: String,
});
const Hotel = mongoose.model('Hotel', hotelSchema);

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
