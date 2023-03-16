const express = require('express')
const router = express.Router()
const db = require('../models');


// BUCKETLIST ROUTE
router.get('/', function (req, res) {
    db.Bucket.find({ completed: false })
        .then(buckets => {
            res.render('bucket', {
                buckets: buckets
            })
        })
});


// NEW ROUTE (1st RESTFUL) works
router.get('/new', (req, res) => {
    res.render('bucketlist-form')
})

// CREATE ROUTE (2nd RESTFUL) works
router.post('/', (req, res) => {
    console.log(req.body)
    db.Bucket.create(req.body)
        .then(bucket => res.redirect('/bucketlist'))
})

// EDIT ROUTE work
router.get('/:id/edit', (req, res) => {
    db.Bucket.findById(req.params.id)
        .then(bucket => {
            res.render('editBucket', {
                Bucket: bucket
            })
        })
})

// UPDATE ROUTE (4th REST) no work
router.put('/:id', (req, res) => {
    db.Bucket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(bucket => res.redirect('/bucketlist/' + bucket.id))
})

// Destroy Route (5th REST) no work
router.delete('/:id', (req, res) => {
    db.Bucket.findByIdAndRemove(req.params.id)
        .then(Bucket => res.send('You\'ve deleted pet ' + Bucket._id))
})

// Create another route (router.get(/:id)) for user to click on bucketlist and see it indiv.

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
