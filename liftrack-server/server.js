// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/groceries");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Grocery = mongoose.model('Grocery', {
    name: String,
    reps: Number,
    sets: Number,
    weight: Number,
    date: Date,
    notes: String,
});

// Profile Model
var Weight = mongoose.model('Weight', {
    weight: Number,
    date: Date,
});

// Routes




// Get all grocery items
app.get('/api/lifts', function (req, res) {

    console.log("Listing lifts...");

    //use mongoose to get all groceries in the database
    Grocery.find(function (err, groceries) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(groceries); // return all groceries in JSON format
    });
});

//Get all weights
app.get('/api/weights', function (req, res) {

    console.log("Listing weights...");

    //use mongoose to get all weights in the database
    Weight.find(function (err, weights) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(weights); // return all weights in JSON format
    });
});

// Create a grocery Item
app.post('/api/lifts', function (req, res) {

    console.log("Creating lift...");

    Grocery.create({
        name: req.body.name,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        date: req.body.date,
        notes: req.body.notes,
        done: false
    }, function (err, grocery) {
        if (err) {
            res.send(err);
        }

        // create and return all the groceries
        Grocery.find(function (err, groceries) {
            if (err)
                res.send(err);
            res.json(groceries);
        });
    });

});

// Create weight
app.post('/api/weights', function (req, res) {

    console.log('Creating weight');

    Weight.create({
        weight: req.body.weight,
        date: req.body.date,
        done: false
    }, function (err, weight) {
        if (err) {
            res.send(err);
        }

        Weight.find(function (err, weights) {
            if (err)
                res.send(err);
            res.json(weights);
        });
    });

    });

// Update a grocery Item
app.put('/api/lifts/:id', function (req, res) {
    const grocery = {
        name: req.body.name,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets,
        date: req.body.date,
        notes: req.body.notes,
    };
    console.log("Updating ", req.params.id);
    Grocery.update({_id: req.params.id}, grocery, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a grocery Item
app.delete('/api/lifts/:id', function (req, res) {
    Grocery.remove({
        _id: req.params.id
    }, function (err, grocery) {
        if (err) {
            console.error("Error deleting ", err);
        }
        else {
            Grocery.find(function (err, groceries) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(groceries);
                }
            });
        }
    });
});

// Delete a weight
app.delete('/api/weights/:id', function (req, res) {
    Weight.remove({
        _id: req.params.id
    }, function (err, weight) {
        if (err) {
            console.error("Error deleting ", err);
        }
        else {
            Weight.find(function (err, weights) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(weights);
                }
            });
        }   
    });
});



// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Liftrack server listening on port ", (process.env.PORT || 8080));