/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/pets`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()
const db = require('../models');
const bucket = require('../models/seedBucket');


/* Routes
--------------------------------------------------------------- */
// BUCKETLIST ROUTE
router.get('/', function (req, res) {
    db.Bucket.find({ completed: false })
        .then(buckets => {
            res.render('bucket', {
                buckets: buckets
            })
            console.log(buckets)
        })
});


// NEW ROUTE (1st RESTFUL) works
router.get('/new', (req, res) => {
    res.render('bucketlist-form')
})

// CREATE ROUTE (2nd RESTFUL) no work
router.post('/', (req, res) => {
    db.Bucket.create(req.body)
        .then(bucket => res.redirect('/bucketlist'))
})

// EDIT ROUTE (3rd REST) works
router.get('/:id/edit', (req, res) => {
    db.Bucket.findById(req.params.id)
        .then(bucket => res.send('You\'ll be editing bucket list ' + bucket._id))
})

// UPDATE ROUTE (4th REST) no work
router.put('/:id', (req, res) => {
    db.Bucket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(bucket => res.json(bucket))
})

// Destroy Route (5th REST) works
router.delete('/:id', (req, res) => {
    db.Bucket.findByIdAndRemove(req.params.id)
        .then(bucket => res.send('You\'ve deleted bucketlist ' + bucket._id))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
