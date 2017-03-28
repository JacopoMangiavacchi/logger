var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var logSchema  = new Schema({
    type: {
        type: String,
		enum: ['simple', 'complex'],
        //default: 'simple',
        required: true
    },
    context: {
        type: Object
    },
    payload: {
        type: Object,
        required: true
    }
});
 
module.exports = mongoose.model('Log', logSchema);
