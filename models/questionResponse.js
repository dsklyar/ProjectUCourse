import { Response } from '_debugger';
var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');


var schema = new Schema({
    userID                   : {type : Schema.Types.ObjectId, ref : 'User', required : true},
    courseQuestionID         : {type : Schema.Types.ObjectId, ref : 'CourseQuestion', required : true},
    dateCreated              : {type : Date, required: true},
    dateUpdated              : {type : Date, required: true},
    questionResponse         : {type : String, required: true}
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('questionResponse',schema);