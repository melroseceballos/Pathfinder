/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/pets`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()
const db = require('../models')


/* Routes
--------------------------------------------------------------- */


// Index/HOME Route 
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
            .catch(() => res.send('UH-OH, PAGE NOT FOUND'))
        })

      

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
