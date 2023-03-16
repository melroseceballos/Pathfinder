const express = require('express')
const router = express.Router()
const db = require('../models');


// BUCKETLIST ROUTE (home)
router.get('/', function (req, res) {
    db.Bucket.find({ completed: false })
        .then(buckets => {
            res.render('bucket', {
                buckets: buckets
            })
        })
});
// INDEX ROUTE (7th REST) // need to make more seed data with completed: true
router.get('/completed', function (req, res) { 
    db.Bucket.find({completed: true})
    .then (buckets =>{
            res.render('bucketIndex', {
                Bucket: buckets
            })
    })
    .catch(() => res.send("UH-OH, PAGE NOT FOUND"))
        
})

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

// EDIT ROUTE (3rd REST)
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
        .then(Bucket => res.redirect('/bucketlist'))
})

// SHOW ROUTE (6th REST)
router.get('/:id', function (req,res){
    db.Bucket.findById(req.params.id)
    .then(buckets =>{
        res.render('bucketShow',{
            Bucket: buckets
        })
    })
})



/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
