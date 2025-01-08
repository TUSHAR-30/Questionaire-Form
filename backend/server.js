const cookieParser = require('cookie-parser');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const routes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes'); // New route for Google Auth

const app = express();

// CORS setup
app.use(cors({
  origin: [process.env.FRONTEND_URL_LOCAL, process.env.FRONTEND_URL_DEPLOYED],
  methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
  credentials: true,
}));

app.use(express.json());//in order to attach application/json data coming from client into the request'body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));  //in order to attach application/x-www-form-urlencoded data coming from client into the request'body (This middleware is added just for burpsuite testing)

app.use(passport.initialize());

// MongoDB connection
mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Use routes
app.use(morgan("dev"));
app.use('/api/auth', authRoutes); // New auth routes
app.use('/api', routes); // Existing routes

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
