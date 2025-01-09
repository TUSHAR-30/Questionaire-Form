require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const axios = require('axios');
const routes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes'); // New route for Google Auth

mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));


const app = express();
// app.set('trust proxy', 1);
// app.set('trust proxy',true)

app.use(morgan("dev"));


// CORS setup
app.use(cors({
  origin: [process.env.FRONTEND_URL_LOCAL, process.env.FRONTEND_URL_DEPLOYED],
  methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
  credentials: true,
}));


app.use(async (req, res, next) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    let publicIp = response.data.ip;
    req.publicIp=publicIp;
  } catch (error) {
    console.error('Error fetching public IP:', error.message);
  }

  next();
});

app.use(express.json());//in order to attach application/json data coming from client into the request'body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));  //in order to attach application/x-www-form-urlencoded data coming from client into the request'body (This middleware is added just for burpsuite testing)

app.use(passport.initialize());

// Use routes
app.use('/api/auth', authRoutes); 
app.use('/api', routes); 

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


