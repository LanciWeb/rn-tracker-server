const express = require('express');
const mongoose = require('mongoose');
const Track = mongoose.model('Track');
const authMiddleware = require('../middlewares/requireAuth');
const { response } = require('express');

const router = express.Router();

router.use(authMiddleware);

router.get('/tracks', async (req, res) => {
  const userId = req.user._id;
  const tracks = await Track.find({ userId });
  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations)
    return res
      .status(402)
      .send({ error: 'You must provide name and location' });
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
