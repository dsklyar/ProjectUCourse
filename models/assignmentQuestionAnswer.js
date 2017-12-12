var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');


var schema = new Schema({
    userID                   : {type : Schema.Types.ObjectId, ref : 'User', required : true},
    assignmentQuestionID     : {type : Schema.Types.ObjectId, ref : 'AssignmentQuestion', required : true},
    studentAnswerObject      : {type : Schema.Types.Mixed},
    triesUsed                : {type : Number, required : true},
    score                    : {type : Number, required : true},
    completed                : {type : Boolean, required : true},
    dateSaved                : {type : Date, required : true},
    assignmentID             : {type : Schema.Types.ObjectId, ref : 'Assignment'}
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('AssignmentQuestionAnswer',schema);