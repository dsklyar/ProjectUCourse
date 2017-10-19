var mongoose = require('mongoose'),
Schema = mongoose.Schema;
    User = require('./user.js'),
    UserSchema = mongoose.model('User').schema;
    Question = require('./question.js'),
    QuestionSchema = mongoose.model('Question').schema;
var mongooseUniqueValidator =  require('mongoose-unique-validator');


var schema = new Schema({
    title                   : {type : String, required : true},
    dateCreated             : {type : Date, required : true},
    dateUpdated             : {type : Date, required : true},
    question                : [{type : Schema.Types.ObjectId, ref: Question}]
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Response',schema);