require('./models/User');
require('./models/Track');
const mongoUri = require('./keys');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const authMiddleware = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json()); //! express does not know json
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});

mongoose.connection.on('error', (e) => {
  console.error('Error connectiong to mongo', e);
});

app.get('/', authMiddleware, (req, res) => {
  res.send(`Access by ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
