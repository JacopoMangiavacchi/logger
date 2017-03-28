var express = require('express');
 
// Get the router
var router = express.Router();
 
var Log     = require('./models/log');
 
// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});
 
// Create a log (using POST at http://localhost:8080/log)
router.route('/log')
    .post(function(req, res) {
        console.log(req.body) 

        var log = new Log();
        
        // Map passed body to Log Schema and to Context specific Schema
        log.type = req.body.type
	    log.context = req.body.context;
	    log.payload = req.body.payload;
 
        var error = log.validateSync();
        if (error == null) {
            // Save log and check for errors
            log.save(function(err) {
                if (err) {
                    console.log('Error saving: ', err);
                    res.send(err);
                }
                else {
                    console.log('Saved');
                    res.json({ message: 'Log created successfully!' });
                }
            });
        }
        else {
            console.log('Error validating: ', error);
            res.send(error);
        }
    });

module.exports = router;
 
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
