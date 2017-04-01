var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var routes     = require('./routes');
var mongoose = require("mongoose");
var timeout = require('connect-timeout');

app.use(timeout('30s'));

// express app will use body-parser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
// Set port
var port = process.env.PORT || 8080;        // set the port
 
// Define a prefix for all routes
// Can define something unique like MyRestAPI
// We'll just leave it so all routes are relative to '/'
app.use('/', routes);

/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
 
var conn = mongoose.connection;             

var mongodbUri = 'mongodb://XXX:YYY@ZZZ.mlab.com:35790/mongokywix?authSource=mongokywix&authMechanism=SCRAM-SHA-1&connectTimeoutMS=30000&socketTimeoutMS=30000';
mongoose.connect(mongodbUri);
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
    console.log('opened mongodb database');

    // Start server listening on port 8080
    app.listen(port);
    console.log('RESTAPI listening on port: ' + port);
});    

conn.on('disconnected', function () {
    //Reconnect on timeout
    console.log('reconnecting to mongodb database');
    mongoose.connect(mongodbUri);
});

