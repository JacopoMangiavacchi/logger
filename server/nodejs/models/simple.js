var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var simpleSchema  = new Schema({
    simpleValue: {
        type: String,
        required: true
    },
    payload: {
        type: Object,
        required: true
    }
});
 
module.exports = mongoose.model('Simple', simpleSchema);
