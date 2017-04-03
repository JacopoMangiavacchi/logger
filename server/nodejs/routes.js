var express = require('express');
var mongoose = require('mongoose');
var jsonSchema = require('mongoose-jsonschema').modelToJSONSchema;

// Get the router
var router = express.Router();
 
// Middleware for all this routers requests
router.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});


// Getlog templates - models - mongoose schemas supported
router.route('/logs')
    .get(function(req, res) {
        res.json(["simple"]);
 });


// Get template schema or Create a log according to a schema (using POST at http://localhost:8080/log/simple)
router.route('/log/:template')
    // Get a template - model - mongoose schema json
    .get(function(req, res) {
        try {
            var schema = require(`./models/${req.params.template}`);
            res.json(jsonSchema(schema));
        } catch (error) {
            res.json({ message: 'No template found' });
        }
    })
    // Create a log according to a schema (using POST at http://localhost:8080/log/simple)
    .post(function(req, res) {
        console.log(req.params.template)
        console.log(req.body) 

        try {
            var Schema = require(`./models/${req.params.template}`);
            var jsonschema = jsonSchema(Schema);
            var schemaobject = new Schema();

            for (var key in jsonschema.properties) {
                if (req.body.hasOwnProperty(key)) {
                    schemaobject[key] = req.body[key];
                }
            }

            console.log("validating simple ...")

            var error = schemaobject.validateSync();
            if (error == null) {
                console.log("saving simple ...")
                schemaobject.save(function(err) {
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
                saveGenericLog(req.params.template, req.body, res)
            }

        } catch (error) {
            console.log("Error catched")
            //console.log(error)
            saveGenericLog(req.params.template, req.body, res)
        }
    });

module.exports = router;

function saveGenericLog(template, body, res) {
    console.log("saving generic ...")

    var GenericSchema = require('./models/generic');
    var generic = new GenericSchema();
    generic.template = template;
    generic.body = body;

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
}


function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
