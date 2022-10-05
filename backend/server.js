const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT || 5000;
const router = require('./routes/goalRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

// express app object
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// routes initialize
app.use('/api/goals', router);


// Error handlelling
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server started ${port}`.magenta)
});