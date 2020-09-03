const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Must provide email and password');
    return res.status(422).send({ error: 'Must provide email and password' });
  }
  const user = await User.findOne({ email });

  if (!user) {
    console.log('No user found');
    return res.status(422).send({ error: 'No user found' });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    res.send({ token });
  } catch (err) {
    console.log('Invalid email or password');
    return res.status(422).send({ error: 'Invalid email or password' });
  }
});

module.exports = router;
