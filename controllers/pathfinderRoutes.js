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
    db.Destination.find({isFeatured: true})
        .then( place => res.json(place))
})


// // Show Route 
// router.get('/:id', function (req, res) { //<------- change to whatever destination is clicked, create multiple for each destination. Eg: /Greece, /Philippines
//     db.Pet.findById(req.params.id)
//         .then(pet => res.json(pet))
//         .catch(() => res.send('404 Error: Page Not Found'))
// })


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
