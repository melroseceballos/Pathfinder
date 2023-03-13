require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const destinationCtrl = require('./controllers/pathfinderRoutes')
/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');
/* Create the Express app
--------------------------------------------------------------- */
const app = express();
// LIVERELOAD 
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
// CONFIGURING APP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());



/* Mount routes
--------------------------------------------------------------- */

// HOME/INDEX PAGE
app.get('/', function (req, res) {
   db.Destinations.find({isFeatured: true})
   .then(destination => {
        res.render('home',{
            destination: destination
        })
   })
});

// SEED 
app.get('/seed', function(req,res){
    db.Destinations.deleteMany({})
    .then(removedDestinations => {
        console.log(`Removed ${removedDestinations.deletedCount} destinations`)
    db.Destinations.insertMany(db.seedDestination)
    .then(addedDestinations =>{
        console.log(`Added ${addedDestinations.length} destinations to be inserted`)
        res.json(addedDestinations)
    })
    })
})

app.use('/pathfinderRoutes', destinationCtrl)
/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
