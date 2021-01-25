const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = 4000;

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/notedb', {
   useNewUrlParser: true,
});

mongoose.connection.once('open', () => {
    console.log("Mongodb connection established succesfully");
});

// Import Routes
const rootRoute = require('./routes/root'); 
const noteRoute = require('./routes/note');
const binRoute = require('./routes/bin');

// Middleware
app.use(express.json());
app.use(cors());
app.use('/', rootRoute);
app.use('/note', noteRoute);
app.use('/trashbin', binRoute);

// Listen Port
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});