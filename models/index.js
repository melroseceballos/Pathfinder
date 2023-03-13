require ('dotenv').config()
const mongoose = require('mongoose');
const mongodburi = process.env.MONGODBURI;

// ASYNC FUNCTION THAT WILL WAIT FOR MONGOOSE TO CONNECT TO DATABASE
// PRIOR TO EXECUTING CODE
(async function () {
    await mongoose.connect(MONGODBURI);
    console.log('MONGOOSE IS CONNECTED TO', mongodburi);
} )().catch(err => console.log('MongoDB connection error:\n' + err))

