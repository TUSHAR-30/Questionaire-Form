const cookieParser = require('cookie-parser');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');


const app = express();
app.use(cors({
  origin: [ process.env.FRONTEND_URL_LOCAL ,process.env.FRONTEND_URL_DEPLOYED],
  methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


// Connect to MongoDB
mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Use routes
app.use(morgan("dev"));
app.use('/api', routes);

// Start server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
