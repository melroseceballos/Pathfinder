const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
        place: {type: String,},
        date: {type: String,},
        reason: {type: String,},
        completed: {type: Boolean},
        photo: {type: String}

    }
)

module.exports = mongoose.model('Bucket', bucketSchema);