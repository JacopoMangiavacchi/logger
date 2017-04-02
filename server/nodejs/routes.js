var express = require('express');
 
// Get the router
var router = express.Router();
 
// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});


// Create a log (using POST at http://localhost:8080/log/simple)
router.route('/log/:template')
    .post(function(req, res) {
        console.log(req.params.template)
        console.log(req.body) 

        // Save log and check for errors
        switch (req.params.template) {
            case 'simple':
                console.log("validating simple ...")

                var SimpleSchema = require('./models/simple');
                var simple = new SimpleSchema();
                simple.simpleValue = req.body.simpleValue
                simple.payload = req.body.payload;

                var error = simple.validateSync();
                if (error == null) {
                    console.log("saving simple ...")
                    simple.save(function(err) {
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
                break;
        
            default:
                console.log("saving generic ...")

                var GenericSchema = require('./models/generic');
                var generic = new GenericSchema();
                generic.body = req.body

                generic.save(function(err) {
                    if (err) {
                        console.log('Error saving: ', err);
                        res.send(err);
                    }
                    else {
                        console.log('Saved');
                        res.json({ message: 'Warning: Generic Log created successfully!' });
                    }
                });
                break;
        }
    });

module.exports = router;
 
function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
