const mongoose = require('mongoose');

const destinationSchema= new mongoose.Schema({
    destination: {type: String, required: true},
    date: {type: String , required: true},
    isFeatured: {type: Boolean},
    hotels: {type: Number },
    flights: {type: Number },
    activities: {type: Number},
    misc: {type: Number},
    photo: {type: String}

}
)

module.exports = mongoose.model('Destination', destinationSchema)