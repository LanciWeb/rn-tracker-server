const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    speed: Number,
    heading: Number,
    altitude: Number,
    latitude: Number,
    accuracy: Number,
    longitude: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    default: '',
    type: String,
  },
  locations: [pointSchema],
});

mongoose.model('Track', trackSchema);
