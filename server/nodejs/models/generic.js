var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var genericSchema  = new Schema({
    template:{ 
        type: String, 
        required: true
    },
    datetime: { 
        type: Date, 
        default: Date.now 
    },
    body: {
        type: Object
    }
});
 
module.exports = mongoose.model('Generic', genericSchema);
