var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');

var schema = new Schema({
    userID                   : {type : Schema.Types.ObjectId, ref : 'User', required : true},
    score                    : {type : Number, required : true},
    completed                : {type : Boolean, required : true},
    assignmentID             : {type : Schema.Types.ObjectId, ref : 'Assignment', required : true}
});

module.exports = mongoose.model('AssignmentStudent',schema);