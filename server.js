require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const pathFinderRoutes = require('./controllers/pathfinderRoutes')
const bucketListRoute = require('./controllers/bucketList')
const methodOverride = require('method-override')
// const bucketlistCtrl = require('./views/bucket')
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/pathfinderRoutes', pathFinderRoutes)
app.use('/bucketlist', bucketListRoute)


/* Mount routes
--------------------------------------------------------------- */

// HOME ROUTE
app.get('/', function (req, res) {
   db.Destinations.find({isFeatured: true})
   .then(destination => {
        res.render('home',{
            destination: destination
        })
   })
});

// ABOUT ROUTE works
app.get('/about', function (req, res) {
    res.render('about')
});

// CATCH ALL ROUTE works
app.get('*', function (req, res) {
    res.render('404')
});



// SEED DESTINATIONS
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

// SEED BUCKETLIST
app.get('/seedBucket', function(req,res){
    db.Bucket.deleteMany({})
    .then(removedBuckets => {
        console.log(`Removed ${removedBuckets.deletedCount} bucket lists`)
    db.Bucket.insertMany(db.seedBucket)
    .then(addedBuckets =>{
        console.log(`Added ${addedBuckets.length} bucket lists to be inserted`)
        res.json(addedBuckets)
    })
    })
})

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
