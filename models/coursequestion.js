var mongoose = require('mongoose'),
Schema = mongoose.Schema;
    User = require('./user.js'),
    UserSchema = mongoose.model('User').schema;
    Course = require('./course.js'),
    CourseSchema = mongoose.model('Course').schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    title                   : {type : String, required : true},
    coursequestionBody      : {type : String, required : true},
    dateCreated             : {type : Date, required : true},
    dateUpdated             : {type : Date, required : true},
    responses               : [{type : Schema.Types.ObjectId, ref: 'Response'}]
});
schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Coursequestion',schema);