const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
        place: {type: String, required: true},
        date: {type: String, required: true},
        reason: {type: String, required: true},
        completed: {type: Boolean},
        photo: {type: String}

    }
)

module.exports = mongoose.model('Bucket', bucketSchema);