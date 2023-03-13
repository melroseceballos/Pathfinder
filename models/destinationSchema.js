const mongoose = require('mongoose');

const destinationSchema= new mongoose.Schema({
    destination: {type: String, required: true},
    date: {type: Date , required: true},
    isFeatured: {type: Boolean},
    hotels: {type: Number },
    flights: {type: Number },
    activities: {type: Number},
    people: {type: String},
    misc: {type: String},
    photo: {type: String}

}
)

module.exports = mongoose.model('Destination', destinationSchema)