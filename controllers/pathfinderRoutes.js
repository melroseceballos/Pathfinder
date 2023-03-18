/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index
router.get('/', function (req, res) { 
    db.Destinations.find({isFeatured: true})
    .then (destinations =>{
            res.render('destinationIndex', {
                Destination: destinations
            })
    })
    .catch(() => res.send("UH-OH, PAGE NOT FOUND"))
        
})

// SHOW ROUTE
router.get('/:id', function (req, res) { 
    db.Destinations.findById(req.params.id)
        .then(destinations => {
            res.render('destinationShow',{
                Destination: destinations
            })
            })
            .catch(() => res.render('404'))
        })



/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
