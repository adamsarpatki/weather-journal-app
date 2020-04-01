// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

// Configuring express to use body-parser as middle-ware
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

//Initializing server callback function
app.listen(port, () => { console.log(`running on localhost: ${port}`) });

//GET route that returns projectData
app.get('/data', function (req, res) {
    res.send(projectData);
})

//POST route that adds incoming data to projectData
app.post('/data', function (req, res) {
    projectData['temperature'] = req.body.temperature;
    projectData['date'] = req.body.date;
    projectData['userResponse'] = req.body.userResponse;
    res.send({});
})